'use client' 
import { Button, Card, CardBody, CardFooter, Heading, Skeleton, Stack, Text } from "@chakra-ui/react";
import { useRouter } from 'next/navigation'
interface employeesProps {
    id: number;
    name: string;
    companyId: number;
}

export default function ListComponent({ employees }: { employees: employeesProps[] }) {
    const router = useRouter()

    if (employees.length <= 0) {
        return (
            <Stack>
                <Skeleton height='20px' />
                <Skeleton height='20px' />
                <Skeleton height='20px' />
            </Stack>
        )
    }

    return (
        <>
            {employees.map(item => (
                <Card
                direction={{ base: 'row', sm: 'row' }}
                overflow='hidden'
                variant='outline'
              >
                <Stack>
                  <CardBody>
                    <Heading size='md'>{item.name}</Heading>
                  </CardBody>
              
                  <CardFooter>
                    <Button variant='solid' colorScheme='blue' onClick={() => router.push(`/appointments/${item.id}`)}>
                      Agendar horário
                    </Button>
                  </CardFooter>
                </Stack>
              </Card>
            ))}
        </>
    )
}