import { Flex, Text } from '@gjensidige/builders-components'
import { Car } from '@gjensidige/builders-icons/products'

export function VehicleLine() {
  return (
    <Flex direction="row" gap="xs" align="center" wrap="nowrap">
      <Car />
      <Text>Toyota RAV4, BS 73427</Text>
    </Flex>
  )
}
