'use client'
import { useFormik } from "formik";
import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  VStack
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { request } from "@/app/api";
import { useRouter } from 'next/router';

interface availableSlots {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}


export default function Appointments() {
  const router = useRouter();
  const {id} = router.query ;
  const [availableSlots, setAvailableSlots] = useState<availableSlots[]>()
  useEffect(() => {
    request('get', `/clients/employees/${id}/available-slots`).then(response => response.text()).then((data) => setAvailableSlots(JSON.parse(data))).catch(err =>
      console.log(err)
    )
  }, [])
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      hour: ""
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    }
  });
  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
      <Box bg="white" p={10} rounded="md" w={'80%'}>

        <form onSubmit={formik.handleSubmit}>
          <VStack spacing={4} align="flex-start">
            <FormControl>
              <FormLabel htmlFor="name">Nome completo</FormLabel>
              <Input
                id="name"
                name="name"
                type="text"
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Número de telefone</FormLabel>
              <Input
                id="phone"
                name="phone"
                type="number"
                variant="filled"
                onChange={formik.handleChange}
                value={formik.values.phone}
              />
            </FormControl>
            <FormLabel htmlFor="password">Horários dísponiveis</FormLabel>
            <ButtonGroup gap={availableSlots?.length || 0}>
              {availableSlots?.map(item => (
                <Button onClick={() => { formik.values.hour = item.startTime }}>
                  {item.startTime}
                </Button>
              ))}
              </ButtonGroup>
            <Button type="submit" colorScheme="blue" width="full">
              Finalizar agendamento
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
}
