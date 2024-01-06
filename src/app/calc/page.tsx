'use client'

import { Text, Select, NumberInput, NumberInputHandlers, Grid } from '@mantine/core';
import { useRef } from 'react';

const CalcPage = () => {
  const servant = {
    "id": 1,
    "name": "ククルカン",
    "className": "フォーリナー",
    "rarity": 5,
    "gender": "female",
    "attribute": "STAR",
    "atkGrowth": [12584, 10500, 11000, 11700],
    "npRate": 0.0078,
    "noblePhantasmUpgrades": {
      "noblePhantasmData": [
        {
          "commandCardData": { // 宝具の基本情報
            "commandCardType": "BUSTER", // 宝具タイプ
            "hitsData": [6, 13, 20, 26, 35], // ヒット毎のダメージ割合
            "npRate": 0.0078, // NP獲得率
            "criticalStarGen": 0.15 // スター発生率
          },
          "effects": [
            {
              "type": "GrantBuff", // バフ付与
              "target": "SELF", // 自分に付与
              "buffData": [
                { // 宝具前のバフ情報
                  "type": "SpecificAttackBuff", // 特攻付与
                  "numTurnsActive": 1, // ターン１
                  "applyCondition": { // 特攻付与条件
                    "type": "TargetsHaveTrait", // 特攻対象
                    "value": "THREAT_TO_HUMANITY", // 特攻対象 (人類の脅威)
                    "target": "DEFENDER" // 宝具対象
                  },
                  "values": [0.5], // 特攻倍率
                  "buffIcon": "specialDamageUp" // バフアイコン
                }
              ]
            },
            {
              "type": "NoblePhantasmDamage", // 宝具ダメージ
              "target": "ALL_ENEMIES", // 全体
              "values": [300, 400, 450, 475, 500], // ダメージ倍率
              "npDamageAdditionalParams": { // 宝具ダメージ追加効果
                "npSpecificDamageCondition": { // 宝具ダメージ追加効果条件
                  "type": "TargetsHaveTrait", // 特攻対象
                  "value": "EARTH", // 特攻対象 (地)
                  "target": "DEFENDER"// 宝具対象
                },
                "isNpSpecificDamageOverchargedEffect": true, // 宝具オーバーチャージ効果
                "npSpecificDamageRate": [1.5, 1.625, 1.75, 1.875, 2.0] // 宝具ダメージ追加効果倍率
              }
            },
            {
              "type": "GrantBuff", // バフ付与
              "target": "ALL_ENEMIES", // 敵全体
              "buffData": [
                { // 宝具後のバフ情報
                  "type": "SkillSeal", // スキル封印
                  "numTurnsActive": 1, // ターン１
                  "buffIcon": "skillSeal" // バフアイコン
                }
              ]
            },
            {
              "type": "CriticalStarChange", // スター発生率変更
              "intValues": [30] // スター発生率変更値
            }
          ],
          "noblePhantasmType": "ALL_TARGETS_NP" // 宝具タイプ (全体宝具)
        }
      ]
    },
  }

  const averageDamage = () => {
    // 固定補正値
    const FIXED_CORRECTION_NUMBER = 0.23

    // const sAtkBuff = this.sAtkBuff === '' ? 0 : this.sAtkBuff
    // const specialResist = (100 - specialResist) * 0.01
    const fou = 1000
    const dressAtk = 2400
    const noblePhantasmMultiplier = 500
    const noblePhantasmCardCorrection = 1.5
    const classCompatibility = 2.0
    const attributeCompatibility = 1.0
    const classCorrection = 1.0
    const atkBuff = 50
    const cardBuff = 30
    const specificAttackBuff = 50
    const noblePhantasmBuff = 30
    const npSpecificDamageRate = 150

    let result = Math.floor(
      (servant.atkGrowth[0] + fou + dressAtk) *
        (noblePhantasmMultiplier / 100) *
        FIXED_CORRECTION_NUMBER *
        (noblePhantasmCardCorrection * ((100 + cardBuff) / 100)) *
        classCompatibility *
        attributeCompatibility *
        classCorrection *
        ((100 + atkBuff) / 100) *
        ((100 + specificAttackBuff + noblePhantasmBuff) / 100) *
        (npSpecificDamageRate / 100)
    )
    return result
  }

  const minimumDamage = () => {
    const MINIMUM_RANDOM_NUMBER = 0.9
    return Math.floor(averageDamage() * MINIMUM_RANDOM_NUMBER)
  }

  const maximumDamage = () => {
    const MAXIMUM_RANDOM_NUMBER = 1.099
    return Math.floor(averageDamage() * MAXIMUM_RANDOM_NUMBER)
  }

  const handlersRef = useRef<NumberInputHandlers>(null);

  return (
    <>
      <div>CalcPage</div>
      <div>
        <ul>
          <li>{servant.name}</li>
          <li>{servant.className}</li>
          <li>{servant.atkGrowth[0]}</li>
          <li>最小ダメージ{minimumDamage().toLocaleString()}</li>
          <li>平均ダメージ{averageDamage().toLocaleString()}</li>
          <li>最大ダメージ{maximumDamage().toLocaleString()}</li>
        </ul>
        <Text size="xs">Extra small text</Text>
        <Text size="sm">Small text</Text>
        <Text size="md" c="blue">Default text</Text>
        <Text size="lg">Large text</Text>
      </div>

      <div>
        <Text size="lg" c="teal.4">計算エリア</Text>
        <Grid>
          <Grid.Col span={{ base: 4, md: 6, lg: 3 }}>
            <Select
            label="Lv."
            data={['90', '100', '110', '120']}
          />
          </Grid.Col>
          <Grid.Col span={{ base: 4, md: 6, lg: 3 }}>
            <Select
              label="フォウ"
              data={['+1000', '+2000', '+なし']}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 4, md: 6, lg: 3 }}>
            <Select
              label="宝具Lv."
              data={['1', '2', '3', '4', '5']}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 4, md: 6, lg: 3 }}>
            <Select
              label="宝具OC"
              data={['1', '2', '3', '4', '5']}
            />
          </Grid.Col>
        </Grid>
        {/* <Select
          label="Lv."
          data={['90', '100', '110', '120']}
        />
        <Select
          label="フォウ"
          data={['+1000', '+2000', '+なし']}
        />
        <Select
          label="宝具Lv."
          data={['1', '2', '3', '4', '5']}
        />
        <Select
          label="宝具OC"
          data={['1', '2', '3', '4', '5']}
        />
        <Select
          label="概念礼装"
          data={['黒聖杯', 'カレスコ']}
        /> */}
      </div>
      <div>
        <Text size="lg" c="teal.4">バフ</Text>
        <Grid>
          <Grid.Col span={{ base: 4, md: 6, lg: 3 }}>
            <NumberInput
              label="攻バフ%"
              placeholder="Click the buttons"
              handlersRef={handlersRef}
              step={5}
              min={10}
              max={500}
              defaultValue={0}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 4, md: 6, lg: 3 }}>
            <NumberInput
              label="色バフ%"
              placeholder="Click the buttons"
              handlersRef={handlersRef}
              step={5}
              min={10}
              max={500}
              defaultValue={0}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 4, md: 6, lg: 3 }}>
            <NumberInput
              label="宝具バフ%"
              placeholder="Click the buttons"
              handlersRef={handlersRef}
              step={5}
              min={10}
              max={500}
              defaultValue={0}
            />
          </Grid.Col>
        </Grid>
      </div>
    </>
  )
}

export default CalcPage