import { SMSUsersResponse } from "@/models/SMSUser";

export const dummySMSUsersResponse: SMSUsersResponse = {
    meta: {
      status: "200",
      message: "All 6 Users Retrieved Successfully",
      success: true
    },
    data: [
      {
        firstname: "Bernard",
        lastname: "Iorver",
        email: "bernard.iorver28@gmail.com",
        address: "Kaduna, Nigeria",
        balance: 7500,
        dateofbirth: "1992-03-15T00:00:00Z",
        joiningdate: "2024-07-09T00:00:00Z",
        gender: "MALE",
        middlename: "Bemshima",
        phone: "08034567891",
        religion: "christianity",
        clientemail: "admin@admin.com",
        id: "66d001a9ecbaf1234de56789",
        password: "rice8828",
        roles: [
          { id: 1, name: "ADMIN" }
        ]
      },
      {
        firstname: "Samuel",
        lastname: "Okoro",
        email: "samuel.okoro@example.com",
        address: "Lagos, Nigeria",
        balance: 7500,
        dateofbirth: "1992-03-15T00:00:00Z",
        joiningdate: "2024-07-09T00:00:00Z",
        gender: "MALE",
        middlename: "Chinedu",
        phone: "08034567891",
        religion: "christianity",
        clientemail: "admin@admin.com",
        id: "66d001a9ecbaf1234de56789",
        roles: [
          { id: 3, name: "TEACHER" }
        ]
      },
      {
        firstname: "Aisha",
        lastname: "Bello",
        email: "aisha.bello@example.com",
        address: "Kano, Nigeria",
        balance: 1200,
        dateofbirth: "1995-11-22T00:00:00Z",
        joiningdate: "2024-07-18T00:00:00Z",
        gender: "FEMALE",
        middlename: "Fatima",
        phone: "08123456789",
        religion: "islam",
        clientemail: "support@domain.com",
        id: "66d002f3abcf5678d9012345",
        roles: [
          { id: 4, name: "STUDENT" }
        ]
      },
      {
        firstname: "Michael",
        lastname: "Eze",
        email: "michael.eze@example.com",
        address: "Enugu, Nigeria",
        balance: 0,
        dateofbirth: "1982-09-10T00:00:00Z",
        joiningdate: "2024-07-15T00:00:00Z",
        gender: "MALE",
        middlename: "Chukwudi",
        phone: "08087654321",
        religion: "christianity",
        clientemail: "admin@school.com",
        id: "66d003c1ffde9876bc543210",
        roles: [
          { id: 6, name: "PARENT" }
        ]
      },
      {
        firstname: "Grace",
        lastname: "Adeyemi",
        email: "grace.adeyemi@example.com",
        address: "Ibadan, Nigeria",
        balance: 52000,
        dateofbirth: "2001-05-07T00:00:00Z",
        joiningdate: "2024-07-17T00:00:00Z",
        gender: "FEMALE",
        middlename: "Oluwatoyin",
        phone: "07012345678",
        religion: "christianity",
        clientemail: "info@school.org",
        id: "66d004e2aabbccddeeff1122",
        roles: [
          { id: 2, name: "MODR" }
        ]
      },
      {
        firstname: "Umar",
        lastname: "Suleiman",
        email: "umar.suleiman@example.com",
        address: "Jos, Nigeria",
        balance: 300,
        dateofbirth: "1998-02-28T00:00:00Z",
        joiningdate: "2024-07-19T00:00:00Z",
        gender: "MALE",
        middlename: "Yakubu",
        phone: "08199887766",
        religion: "islam",
        clientemail: "client@edu.org",
        id: "66d005f4ccddeeff11223344",
        roles: [
          { id: 1, name: "ADMIN" }
        ]
      }
    ]
  };
  
