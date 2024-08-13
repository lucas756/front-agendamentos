'use client'
import { Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { request } from "./api";
import ListComponent from "@/components/appointments/ListComponent";

interface employeesProps {
  id: number;
  name: string;
  companyId: number;
}

export default function Home() {
  const [employees, setEmployees] = useState<employeesProps[]>([])

  useEffect(() => {
    request('get', 'employees').then(response => response.text()).then((data) => setEmployees(JSON.parse(data))).catch(err => 
      console.log(err)
    )
  }, [])


  return (
    <Tabs isFitted variant='enclosed'>
      <TabPanels minHeight={'93vh'}>
        <TabPanel>
        <Text fontSize='4xl'>Profissionais</Text>
          <ListComponent employees={employees} />
          
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
      </TabPanels>
      <TabList>
        <Tab>Agendar</Tab>
        <Tab>Ver agendamentos</Tab>
      </TabList>
    </Tabs>
  );
}
