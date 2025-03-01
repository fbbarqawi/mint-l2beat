import { Logger } from '@l2beat/backend-tools'
import { DiscoveryDiff } from '@l2beat/discovery'
import { ChainId, EthereumAddress, UnixTime } from '@l2beat/shared-pure'

import { UpdateNotifierRepository } from '../../peripherals/database/discovery/UpdateNotifierRepository'
import { Channel, DiscordClient } from '../../peripherals/discord/DiscordClient'
import { diffToMessages } from './utils/diffToMessages'
import { filterDiff } from './utils/filterDiff'
import { isNineAM } from './utils/isNineAM'

export interface UpdateMetadata {
  blockNumber: number
  chainId: ChainId
  dependents: string[]
  unknownContracts: EthereumAddress[]
}

export class UpdateNotifier {
  constructor(
    private readonly updateNotifierRepository: UpdateNotifierRepository,
    private readonly discordClient: DiscordClient | undefined,
    private readonly logger: Logger,
  ) {
    this.logger = this.logger.for(this)
  }

  async handleUpdate(
    name: string,
    diff: DiscoveryDiff[],
    metadata: UpdateMetadata,
  ) {
    // TODO(radomski): Discord notifications for chains different than
    // Ethereum are for now disabled. We still want to update the database
    // with the newest discovery but we don't want to notify about changes on
    // for example Arbitrum chain since there are a lot of changes that we
    // have not yet looked at.
    if (metadata.chainId !== ChainId.ETHEREUM) {
      return
    }
    const nonce = await this.getInternalMessageNonce()
    const messages = diffToMessages(name, diff, {
      dependents: metadata.dependents,
      blockNumber: metadata.blockNumber,
      chainId: metadata.chainId,
      nonce,
    })
    await this.notify(messages, 'INTERNAL')
    await this.updateNotifierRepository.add({
      projectName: name,
      diff,
      blockNumber: metadata.blockNumber,
    })
    this.logger.info('Updates detected, notification sent [INTERNAL]', {
      name,
      amount: countDiff(diff),
    })

    const filteredDiff = filterDiff(diff, metadata.unknownContracts)
    if (filteredDiff.length === 0) {
      return
    }
    const filteredMessages = diffToMessages(name, filteredDiff, {
      dependents: metadata.dependents,
      blockNumber: metadata.blockNumber,
      chainId: metadata.chainId,
    })
    await this.notify(filteredMessages, 'PUBLIC')
    this.logger.info('Updates detected, notification sent [PUBLIC]', {
      name,
      amount: countDiff(filteredDiff),
    })
  }

  async handleUnresolved(notUpdatedProjects: string[], timestamp: UnixTime) {
    if (!isNineAM(timestamp, 'CET')) {
      return
    }

    await this.notify(
      getDailyReminderMessage(notUpdatedProjects, timestamp),
      'INTERNAL',
    )
    this.logger.info('Daily reminder sent', {
      projects: notUpdatedProjects,
    })
  }

  async getInternalMessageNonce() {
    const latestId = await this.updateNotifierRepository.findLatestId()

    if (latestId === undefined) {
      return 0
    }

    return latestId + 1
  }

  private async notify(messages: string | string[], channel: Channel) {
    if (!this.discordClient) {
      // TODO: maybe only once? rethink
      this.logger.info(
        'DiscordClient not setup, notification has not been sent. Did you provide correct .env variables?',
      )
      return
    }

    const arrayMessages = Array.isArray(messages) ? messages : [messages]
    for (const message of arrayMessages) {
      await this.discordClient.sendMessage(message, channel).then(
        () => this.logger.debug('Notification to Discord has been sent'),
        (e) => this.logger.error('Discord API error', e),
      )
    }
  }

  async handleStart() {
    await this.notify('UpdateMonitor started.', 'INTERNAL')
    await this.notify('UpdateMonitor started.', 'PUBLIC')
    this.logger.info('Initial notifications sent')
  }
}

function getDailyReminderMessage(projects: string[], timestamp: UnixTime) {
  const dailyReportMessage = `\`\`\`Daily bot report @ ${timestamp.toYYYYMMDD()}\`\`\`\n`
  if (projects.length > 0) {
    return `${dailyReportMessage}${projects
      .map((p) => `:x: ${p}`)
      .join('\n\n')}`
  }

  return `${dailyReportMessage}:white_check_mark: everything is up to date`
}
function countDiff(diff: DiscoveryDiff[]): number {
  let count = 0

  for (const d of diff) {
    if (d.type === 'created' || d.type === 'deleted') {
      count++
    } else {
      count += (d.diff ?? []).length
    }
  }
  return count
}
