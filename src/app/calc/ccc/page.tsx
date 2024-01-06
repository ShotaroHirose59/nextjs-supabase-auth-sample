'use client'
import { Button, FormControl, FormLabel, HStack, Input, Select, SimpleGrid, useNumberInput } from "@chakra-ui/react"

export default function HookUsage() {
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

  return (
    <>
      <SimpleGrid columns={2}>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <HStack maxW='140px'>
            <Input {...input} />
            <Button {...inc} size="xs">+</Button>
            <Button {...dec} size="xs">-</Button>
          </HStack>
        </FormControl>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <HStack maxW='140px'>
            <Input {...input} />
            <Button {...inc} size="xs">+</Button>
            <Button {...dec} size="xs">-</Button>
          </HStack>
        </FormControl>
      </SimpleGrid>
      <SimpleGrid columns={2}>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <HStack maxW='140px'>
            <Input {...input} />
            <Button {...inc} size="sm">+</Button>
            <Button {...dec} size="sm">-</Button>
          </HStack>
        </FormControl>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <HStack maxW='140px'>
            <Input {...input} />
            <Button {...inc} size="sm">+</Button>
            <Button {...dec} size="sm">-</Button>
          </HStack>
        </FormControl>
      </SimpleGrid>
      <SimpleGrid columns={2}>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <HStack maxW='140px'>
            <Input {...input} />
            <Button {...inc} size="xs">+</Button>
            <Button {...dec} size="xs">-</Button>
          </HStack>
        </FormControl>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <HStack maxW='140px'>
            <Input {...input} />
            <Button {...inc} size="xs">+</Button>
            <Button {...dec} size="xs">-</Button>
          </HStack>
        </FormControl>
      </SimpleGrid>
      <SimpleGrid columns={2}>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <HStack maxW='160px'>
            <Input {...input} />
            <Button {...inc} size="sm">+</Button>
            <Button {...dec} size="sm">-</Button>
          </HStack>
        </FormControl>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <HStack maxW='160px'>
            <Input {...input} />
            <Button {...inc} size="sm">+</Button>
            <Button {...dec} size="sm">-</Button>
          </HStack>
        </FormControl>
      </SimpleGrid>
      <SimpleGrid columns={3} spacing={4}>
        <Select>
          <option value='option1'>90</option>
          <option value='option2'>100</option>
          <option value='option3'>120</option>
        </Select>
        <Select>
          <option value='option1'>1</option>
          <option value='option2'>2</option>
          <option value='option3'>3</option>
        </Select>
        <Select>
          <option value='option1'>1</option>
          <option value='option2'>2</option>
          <option value='option3'>3</option>
        </Select>
      </SimpleGrid>
      <SimpleGrid columns={2}>
        <Select placeholder='Select option'>
          <option value='option1'>Option 1</option>
          <option value='option2'>Option 2</option>
          <option value='option3'>Option 3</option>
        </Select>
        <Select placeholder='Select option'>
          <option value='option1'>Option 1</option>
          <option value='option2'>Option 2</option>
          <option value='option3'>Option 3</option>
        </Select>
      </SimpleGrid>
    </>
  )
}