# Diff at Mon, 04 Dec 2023 12:52:34 GMT:

- author: Radina Talanova (<nt.radina@gmail.com>)
- comparing to: master@11f81c3217315242a2af781f1c2528aa4938b44c

## Description

A new upgrade proposal has been detected.
Implementations:
DefaultUpgrade: 0x567e1B57A80a7F048A7402191F96C62730e30dB2
AdminFacet: 0x409560DE546e057ce5bD5dB487EdF2bB5E785baB
GettersFacet: 0xF3ACF6a03ea4a914B78Ec788624B25ceC37c14A4
MailboxFacet: 0x63b5EC36B09384fFA7106A80Ec7cfdFCa521fD08
ExecutorFacet: 0x9e3Fa34a10619fEDd7aE40A3fb86FA515fcfd269

## Watched changes

```diff
    contract zkSync (0x32400084C286CF3E17e7B677ea9583e60a000324) {
      values.getCurrentProposalId:
-        10
+        11
      values.getProposedUpgradeHash:
-        "0x0000000000000000000000000000000000000000000000000000000000000000"
+        "0x31e9893a0c33de66bfd89adc9068af6500d315f89c83cb52f018b8dd002faa6c"
      values.getProposedUpgradeTimestamp:
-        0
+        1701681527
      values.getUpgradeProposalState:
-        0
+        1
    }
```

# Diff at Tue, 21 Nov 2023 15:32:06 GMT:

- author: Radina Talanova (<nt.radina@gmail.com>)
- comparing to: master@c91f8874e3c01dd4c477491e11cff7b3c664ef34

## Description

Change in the zkSync Era Multisig owners - one address is removed and another is added.

## Watched changes

```diff
    contract zkSync Era Multisig (0x4e4943346848c4867F81dFb37c4cA9C5715A7828) {
      values.getOwners.7:
-        "0xa265146cA40F52cfC439888D0b4291b5440e6769"
+        "0x700DA14328eC2F81053E5B6aAE4803E16BEdF1df"
    }
```

# Diff at Thu, 02 Nov 2023 07:24:20 GMT:

- author: Radina Talanova (<nt.radina@gmail.com>)
- comparing to: master@9b49ec4aa1d93626f3f30c0e914cb12bb6670dbd

## Description

Proposal updates (the upgrade is executed): a verification key has been updated, meaning that the circuit has been updated.

## Watched changes

```diff
    contract zkSync (0x32400084C286CF3E17e7B677ea9583e60a000324) {
      values.getProposedUpgradeHash:
-        "0x306f3cc703e0e1ab18693aab35276f2dbc745f5de480cee904d05de511ca8415"
+        "0x0000000000000000000000000000000000000000000000000000000000000000"
      values.getProposedUpgradeTimestamp:
-        1698826475
+        0
      values.getProtocolVersion:
-        16
+        17
      values.getUpgradeProposalState:
-        1
+        0
      values.getVerifierParams.2:
-        "0x236c97bfbe75ff507e03909fae32a78be3a70d1b468b183f430010810284ed45"
+        "0x18c1639094f58177409186e8c48d9f577c9410901d2f1d486b3e7d6cf553ae4c"
    }
```

# Diff at Wed, 01 Nov 2023 11:26:01 GMT:

- author: Radina Talanova (<nt.radina@gmail.com>)
- comparing to: master@d5598e9a46a99374387c1df455805e40f3d361a7

## Description

A new proposal is detected.

## Watched changes

```diff
    contract zkSync (0x32400084C286CF3E17e7B677ea9583e60a000324) {
      values.getCurrentProposalId:
-        9
+        10
      values.getProposedUpgradeHash:
-        "0x0000000000000000000000000000000000000000000000000000000000000000"
+        "0x306f3cc703e0e1ab18693aab35276f2dbc745f5de480cee904d05de511ca8415"
      values.getProposedUpgradeTimestamp:
-        0
+        1698826475
      values.getUpgradeProposalState:
-        0
+        1
    }
```

# Diff at Fri, 27 Oct 2023 10:26:34 GMT:

- author: Radina Talanova (<nt.radina@gmail.com>)
- comparing to: master@f531a9c18fd564738c9f66b8b1e5c04730dce464

## Description

A new proposal has been detected.

## Watched changes

```diff
    contract zkSync (0x32400084C286CF3E17e7B677ea9583e60a000324) {
      values.getCurrentProposalId:
-        8
+        9
      values.getProtocolVersion:
-        15
+        16
    }
```

# Diff at Tue, 26 Sep 2023 10:27:16 GMT:

- author: Luca Donno (<donnoh99@gmail.com>)
- comparing to: master@cfd4e281f2af40c7c69302b16c1308c0c5651be0

## Watched changes

```diff
    contract zkSync (0x32400084C286CF3E17e7B677ea9583e60a000324) {
      values.getProposedUpgradeHash:
-        "0x7d39289c3d9fd4fd8d86ed97abcdcfe208677042a65de6cccb91dc97e2936be9"
+        "0x0000000000000000000000000000000000000000000000000000000000000000"
      values.getProposedUpgradeTimestamp:
-        1695294167
+        0
      values.getProtocolVersion:
-        14
+        15
      values.getUpgradeProposalState:
-        1
+        0
      values.getVerifierParams.2:
-        "0x0a3657f884af32d3a573c5fdb3440c9ac45271ede8c982faeaae7434d032ab3e"
+        "0x236c97bfbe75ff507e03909fae32a78be3a70d1b468b183f430010810284ed45"
    }
```

```diff
    contract ValidatorTimelock (0x3dB52cE065f728011Ac6732222270b3F2360d919) {
      values.revertedBlocks:
+        []
    }
```

# Diff at Thu, 21 Sep 2023 12:39:16 GMT:

- author: Luca Donno (<donnoh99@gmail.com>)
- comparing to: master@36d4050a6ee5a543b2163fe6e44153b540b87c16

## Watched changes

```diff
    contract zkSync (0x32400084C286CF3E17e7B677ea9583e60a000324) {
      values.getCurrentProposalId:
-        7
+        8
      values.getProposedUpgradeHash:
-        "0x0000000000000000000000000000000000000000000000000000000000000000"
+        "0x7d39289c3d9fd4fd8d86ed97abcdcfe208677042a65de6cccb91dc97e2936be9"
      values.getProposedUpgradeTimestamp:
-        0
+        1695294167
      values.getUpgradeProposalState:
-        0
+        1
    }
```

```diff
    contract zkSync Era Multisig (0x4e4943346848c4867F81dFb37c4cA9C5715A7828) {
      values.getOwners.1:
-        "0xd7aF418d98C0F8EDbaa407fc30ad10382286F36F"
+        "0xe79af29d618141Ffef951B240b250d47030D56d7"
    }
```
