'use client'
import { Box, Button, Divider, Flex, FormControl, FormLabel, HStack, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, SimpleGrid, Switch, Text, useNumberInput } from "@chakra-ui/react"
import { useEffect, useState } from "react"

export default function HookUsage() {
  const servant = {
    "id": 1,
    "name": "ククルカン",
    "className": "フォーリナー",
    "rarity": 5,
    "gender": "female",
    "attribute": "STAR",
    "atkGrowth": [12584, 10500, 11000, 11700],
    "npRate": 0.0078,
    "activeSkillUpgrades": [
      {
        "activeSkillData": [
          {
            "name": "翡翠のカリスマ A+",
            "detail": "敵全体にスキル封印状態を付与(1ターン)＆防御力をダウン(3ターン) ＋ 自身の攻撃力をアップ(3ターン)",
            "baseCoolDown": 7, // ターン数
            "effects": [
              {
                "detail": "敵全体にスキル封印状態を付与(1ターン)",
                "type": "GrantBuff",
                "target": "ALL_ALLIES", // スキルの対象 (味方全体)
                "buffData": [
                  { // バフの内容
                    "type": "AttackBuff", // 攻撃力アップ
                    "numTurnsActive": 3, // 3ターン
                    "values": [10, 11, 12, 13, 14, 15, 16, 17, 18, 20], // 倍率 (Lv.毎)
                    "value": 20, // 倍率 (Lv.10)
                  }
                ]
              },
              {
                "detail": "＆防御力をダウン(3ターン)",
                "type": "GrantBuff",
                "target": "ALL_ALLIES",
                "buffData": [
                  {
                    "type": "CriticalChanceResist",
                    "numTurnsActive": 3,
                    "values": [20, 21, 22, 23, 24, 25, 26, 27, 28, 30],
                    "value": 30
                  }
                ]
              },
            ]
          }
        ],
      },
      {
        "activeSkillData": [
          {
            "name": "我ら、翼ある蛇 EX",
            "detail": "敵全体にスキル封印状態を付与(1ターン)＆防御力をダウン(3ターン) ＋ 自身の攻撃力をアップ(3ターン)",
            "baseCoolDown": 8,
            "effects": [
              {
                "detail": "敵全体にスキル封印状態を付与(1ターン)",
                "type": "NpChange",
                "target": "TARGETED_ALLY", // ターゲット (味方単体)
                "values": [3, 32, 34, 36, 38, 4, 42, 44, 46, 50], // NP増加率
                "value": 50
              }
            ]
          }
        ],
      },
      {
        "activeSkillData": [
          {
            "name": "黄金樹海紀行 EX",
            "baseCoolDown": 8,
            "effects": [
              {
                "detail": "自身に無敵状態を付与(1ターン)",
                "type": "GrantBuff",
                "target": "SELF",
                "buffData": [
                  {
                    "type": "Invincible", // 無敵
                    "numTurnsActive": 1,
                    "buffIcon": "invincible"
                  }
                ]
              }, 
              {
                "detail": "+ Busterカード性能アップ",
                "type": "GrantBuff",
                "target": "SELF",
                "buffData": [
                  {
                    "type": "CommandCardBuff", // コマンドカード性能アップ
                    "numTurnsActive": 3,
                    "applyCondition": {
                      "type": "CardTypeEquals", // カードタイプが
                      "value": "BUSTER" // バスター
                    },
                    "values": [0.2, 0.21, 0.22, 0.23, 0.24, 0.25, 0.26, 0.27, 0.28, 0.3],
                    "buffIcon": "busterUp"
                  }
                ]
              },
              {
                "type": "GrantBuff",
                "target": "SELF",
                "buffData": [
                  {
                    "type": "CriticalDamageBuff", // クリティカル威力アップ
                    "numTurnsActive": 3,
                    "values": [0.3, 0.32, 0.34, 0.36, 0.38, 0.4, 0.42, 0.44, 0.46, 0.5],
                    "buffIcon": "critDamageUp"
                  }
                ]
              }
            ]
          }
        ],
      }
    ],
    "passiveSkillData": { // クラススキル
      "effects": [
        {
          "name": "対魔力",
          "detail": "自身の弱体耐性をアップ",
          "value": 20
        },
        {
          "name": "騎乗",
          "detail": "自身のQuickカードの性能をアップ",
          "value": 10
        },
        {
          "name": "神性",
          "detail": "自身に与ダメージプラス状態を付与",
          "value": 10
        },
      ]
    },
    "noblePhantasmUpgrades": {
      "noblePhantasmData": [
        {
          "name": "天地乖離す開闢の星", // 宝具名
          "commandCardData": { // 宝具の基本情報
            "commandCardType": "BUSTER", // 宝具タイプ
            "hitsData": [6, 13, 20, 26, 35], // ヒット毎のダメージ割合
            "npRate": 0.0078, // NP獲得率
            "criticalStarGen": 0.15 // スター発生率
          },
          "effects": [
            {
              "detail": "自身に人類の脅威特攻を付与(1T 50%)",
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
              "detail": "＋ 敵全体に強力な地属性特攻攻撃[Lv] (300~500)",
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
              "detail": "& 敵全体のスキルを封印(1T)",
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

  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps: ccc } =
    useNumberInput({
      step: 10,
      defaultValue: 0,
      min: -500,
      max: 500,
    })

  const inc = getIncrementButtonProps()
  const dec = ccc()
  const input = getInputProps()

  const { getInputProps: getAtkBuff, getIncrementButtonProps: getIncrementgetAtkBuff, getDecrementButtonProps: getDecrementAtkBuff } =
    useNumberInput({
      step: 10,
      defaultValue: 10,
      min: -500,
      max: 500,
    })
  const incAtkBuff = getIncrementgetAtkBuff()
  const decAtkBuff = getDecrementAtkBuff()
  const inputAtkBuff = getAtkBuff()

  // console.log(inputAtkBuff.value)

  const [customValue, setCustomValue] = useState(0);
  const { value: cardBuffValue, getInputProps: getCardBuff, getIncrementButtonProps: getIncrementgetCardBuff, getDecrementButtonProps: getDecrementCardBuff } =
    useNumberInput({
      step: 10,
      value: customValue,
      min: -500,
      max: 500,
      onChange: (valueAsString, valueAsNumber) => {
        setCustomValue(valueAsNumber); // 外部の状態を更新
      },
    })
  const incCardBuff = getIncrementgetCardBuff()
  const decCardBuff = getDecrementCardBuff()
  const inputCardBuff = getCardBuff({value: customValue})
  console.log(cardBuffValue)

  const incrementValue = () => {
    const newValue = customValue + 7;
    setCustomValue(newValue);
  };

  return (
    <>
      <div>
        <Text fontSize='xl' color='tomato'>基本情報</Text>
        <ul>
          <li>{servant.name}</li>
          <li>{servant.className}</li>
          <li>{servant.atkGrowth[0]}</li>
        </ul>
      </div>
      <Button onClick={incrementValue}>外部から+1</Button>
      {/* <div>
        <Text fontSize='xl' color='tomato'>宝具</Text>
        <div>
          <Text fontSize='sm' as='b'>{servant.noblePhantasmUpgrades.noblePhantasmData[0].name}</Text>
          <ul>
            {servant.noblePhantasmUpgrades.noblePhantasmData[0].effects.map((effect) => (
              <li key={effect.detail}>{effect.detail}</li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <Text fontSize='xl' color='tomato'>保有スキル</Text>
        {servant.activeSkillUpgrades.map((activeSkillUpgrade) => (
          <>
            <div key={activeSkillUpgrade.activeSkillData[0].name}>
              <Text fontSize='sm' as='b'>{activeSkillUpgrade.activeSkillData[0].name}</Text>
              <ul>
                {activeSkillUpgrade.activeSkillData[0].effects.map((effect) => (
                  <li key={effect.detail}>{effect.detail}</li>
                ))}
              </ul>
            </div>
            <Divider />
          </>
        ))}
      </div>
      <div>
        <Text fontSize='xl' color='tomato'>クラススキル</Text>
        {servant.passiveSkillData.effects.map((effect) => (
          <div key={effect.name}>
            <Text fontSize='sm' as='b'>{effect.name}</Text>
            <Text fontSize='sm'>{effect.detail}</Text>
          </div>
        ))}
      </div> */}
      <Box borderWidth='2px' p={4}>
        <SimpleGrid columns={{ base: 2, lg: 6 }} spacing={4} spacingY='8px'>
          <FormControl>
            <FormLabel>Lv.</FormLabel>
            <Select>
              <option value='option1'>90</option>
              <option value='option2'>100</option>
              <option value='option3'>120</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>フォウくん</FormLabel>
            <Select>
              <option value='option1'>+1000</option>
              <option value='option2'>+2000</option>
              <option value='option3'>なし</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>宝具Lv.</FormLabel>
            <Select>
              <option value='option1'>1</option>
              <option value='option2'>2</option>
              <option value='option3'>3</option>
              <option value='option2'>4</option>
              <option value='option3'>5</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>宝具OC</FormLabel>
            <Select>
              <option value='option1'>1</option>
              <option value='option2'>2</option>
              <option value='option3'>3</option>
              <option value='option2'>4</option>
              <option value='option3'>5</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>概念礼装</FormLabel>
            <Select>
              <option value='option1'>黒聖杯</option>
              <option value='option2'>カレスコ</option>
              <option value='option3'>クランクイン</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>礼装ATK</FormLabel>
            <Input {...inputAtkBuff} />
          </FormControl>
        </SimpleGrid>
        <SimpleGrid columns={{ base: 2, lg: 6 }} spacingX='0px' spacingY='20px'>
          <FormControl>
            <FormLabel>攻バフ</FormLabel>
            <HStack maxW='140px'>
              <Input {...inputAtkBuff} />
              <Button {...incAtkBuff} size="xs">+</Button>
              <Button {...decAtkBuff} size="xs">-</Button>
            </HStack>
          </FormControl>
          <FormControl>
            <FormLabel>色バフ</FormLabel>
            <HStack maxW='140px'>
              <Input {...inputCardBuff} />
              <Button {...incCardBuff} size="xs">+</Button>
              <Button {...decCardBuff} size="xs">-</Button>
            </HStack>
          </FormControl>
          <FormControl>
            <FormLabel>宝具バフ</FormLabel>
            <HStack maxW='140px'>
              <Input {...input} />
              <Button {...inc} size="sm">+</Button>
              <Button {...dec} size="sm">-</Button>
            </HStack>
          </FormControl>
          <FormControl>
            <FormLabel>特攻バフ</FormLabel>
            <HStack maxW='140px'>
              <Input {...input} />
              <Button {...inc} size="sm">+</Button>
              <Button {...dec} size="sm">-</Button>
            </HStack>
          </FormControl>
          <FormControl display='flex'>
            <FormLabel>宝具ブースト</FormLabel>
            <Switch id='email-alerts' />
          </FormControl>
        </SimpleGrid>
      </Box>
      <Box borderWidth='2px' p={4}>
        <Box>
          <div>
            <Text fontSize='lg' as='b'>ダメージ 200000</Text>
            <Text fontSize='lg' as='b'>, </Text>
            <Text fontSize='lg' as='b'>NP 100%</Text>
          </div>
        </Box>
        <SimpleGrid columns={{ base: 1, lg: 3 }}>
          <Box borderWidth='1px' p={2}>
            <Text fontSize='sm' as='b'>エネミー1</Text>
            <Text fontSize='sm'>
              <span>ダメージ 75600</span>
              <span>, </span>
              <span>NP 100%</span>
            </Text>
            <SimpleGrid columns={2} spacing={4}>
              <FormControl>
                <FormLabel>HP</FormLabel>
                <Input {...inputAtkBuff} />
              </FormControl>
              <FormControl>
                <FormLabel>クラス</FormLabel>
                <Select>
                  <option value='option1'>セイバー</option>
                  <option value='option2'>アーチャー</option>
                  <option value='option3'>ランサー</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>属性</FormLabel>
                <Select>
                  <option value='option1'>天</option>
                  <option value='option2'>地</option>
                  <option value='option3'>人</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>防御デバフ</FormLabel>
                <HStack maxW='140px'>
                  <Input {...inputAtkBuff} />
                  <Button {...incAtkBuff} size="xs">+</Button>
                  <Button {...decAtkBuff} size="xs">-</Button>
                </HStack>
              </FormControl>
              <FormControl>
                <FormLabel>色デバフ</FormLabel>
                <HStack maxW='140px'>
                  <Input {...inputAtkBuff} />
                  <Button {...incAtkBuff} size="xs">+</Button>
                  <Button {...decAtkBuff} size="xs">-</Button>
                </HStack>
              </FormControl>
              <FormControl>
                <FormLabel>特殊耐性</FormLabel>
                <HStack maxW='140px'>
                  <Input {...inputAtkBuff} />
                  <Button {...incAtkBuff} size="xs">+</Button>
                  <Button {...decAtkBuff} size="xs">-</Button>
                </HStack>
              </FormControl>
            </SimpleGrid>
            <SimpleGrid columns={2} spacing={4}>
              <FormControl display='flex'>
                <FormLabel>特攻</FormLabel>
                <Switch id='email-alerts' />
              </FormControl>
              <FormControl display='flex'>
                <FormLabel>特攻宝具</FormLabel>
                <Switch id='email-alerts' />
              </FormControl>
            </SimpleGrid>
          </Box>
          <Box borderWidth='1px' p={2}>
            <Text fontSize='sm' as='b'>エネミー2</Text>
            <Text fontSize='sm'>
              <span>ダメージ 75600</span>
              <span>, </span>
              <span>NP 100%</span>
            </Text>
            <SimpleGrid columns={2} spacing={4}>
              <FormControl>
                <FormLabel>HP</FormLabel>
                <Input {...inputAtkBuff} />
              </FormControl>
              <FormControl>
                <FormLabel>クラス</FormLabel>
                <Select>
                  <option value='option1'>セイバー</option>
                  <option value='option2'>アーチャー</option>
                  <option value='option3'>ランサー</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>属性</FormLabel>
                <Select>
                  <option value='option1'>天</option>
                  <option value='option2'>地</option>
                  <option value='option3'>人</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>防御デバフ</FormLabel>
                <HStack maxW='140px'>
                  <Input {...inputAtkBuff} />
                  <Button {...incAtkBuff} size="xs">+</Button>
                  <Button {...decAtkBuff} size="xs">-</Button>
                </HStack>
              </FormControl>
              <FormControl>
                <FormLabel>色デバフ</FormLabel>
                <HStack maxW='140px'>
                  <Input {...inputAtkBuff} />
                  <Button {...incAtkBuff} size="xs">+</Button>
                  <Button {...decAtkBuff} size="xs">-</Button>
                </HStack>
              </FormControl>
              <FormControl>
                <FormLabel>特殊耐性</FormLabel>
                <HStack maxW='140px'>
                  <Input {...inputAtkBuff} />
                  <Button {...incAtkBuff} size="xs">+</Button>
                  <Button {...decAtkBuff} size="xs">-</Button>
                </HStack>
              </FormControl>
            </SimpleGrid>
            <SimpleGrid columns={2} spacing={4}>
              <FormControl display='flex'>
                <FormLabel>特攻対象</FormLabel>
                <Switch id='email-alerts' />
              </FormControl>
              <FormControl display='flex'>
                <FormLabel>特攻宝具</FormLabel>
                <Switch id='email-alerts' />
              </FormControl>
            </SimpleGrid>
          </Box>
          <Box borderWidth='1px' p={2}>
            <Text fontSize='sm' as='b'>エネミー3</Text>
            <Text fontSize='sm'>
              <span>ダメージ 75600</span>
              <span>, </span>
              <span>NP 100%</span>
            </Text>
            <SimpleGrid columns={2} spacing={4}>
              <FormControl>
                <FormLabel>HP</FormLabel>
                <Input {...inputAtkBuff} />
              </FormControl>
              <FormControl>
                <FormLabel>クラス</FormLabel>
                <Select>
                  <option value='option1'>セイバー</option>
                  <option value='option2'>アーチャー</option>
                  <option value='option3'>ランサー</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>属性</FormLabel>
                <Select>
                  <option value='option1'>天</option>
                  <option value='option2'>地</option>
                  <option value='option3'>人</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel>防御デバフ</FormLabel>
                <HStack maxW='140px'>
                  <Input {...inputAtkBuff} />
                  <Button {...incAtkBuff} size="xs">+</Button>
                  <Button {...decAtkBuff} size="xs">-</Button>
                </HStack>
              </FormControl>
              <FormControl>
                <FormLabel>色デバフ</FormLabel>
                <HStack maxW='140px'>
                  <Input {...inputAtkBuff} />
                  <Button {...incAtkBuff} size="xs">+</Button>
                  <Button {...decAtkBuff} size="xs">-</Button>
                </HStack>
              </FormControl>
              <FormControl>
                <FormLabel>特殊耐性</FormLabel>
                <HStack maxW='140px'>
                  <Input {...inputAtkBuff} />
                  <Button {...incAtkBuff} size="xs">+</Button>
                  <Button {...decAtkBuff} size="xs">-</Button>
                </HStack>
              </FormControl>
            </SimpleGrid>
            <SimpleGrid columns={1} spacing={4}>
              <FormControl display='flex'>
                <FormLabel>特攻対象</FormLabel>
                <Switch id='email-alerts' />
              </FormControl>
              <FormControl display='flex'>
                <FormLabel>特攻宝具</FormLabel>
                <Switch id='email-alerts' />
              </FormControl>
            </SimpleGrid>
          </Box>
        </SimpleGrid>
      </Box>
    </>
  )
}