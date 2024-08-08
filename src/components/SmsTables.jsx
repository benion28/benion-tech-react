import React from 'react'
import { Tabs, Typography } from 'antd'
import { SmsUsersTable, SmsStudentsTable, SmsParentsTable, SmsTeachersTable, SmsClientsTable, SmsFeesCollectionTable, 
    SmsExpensesTable, SmsExamScheduleTable, SmsExamResultsTable, SmsHostelsTable, SmsTransportsTable, SmsAttendancesTable
} from '../components'

const { TabPane } = Tabs

const { Fragment } = React
const { Title } = Typography

const SmsTables = () => {
    return (
        <Fragment>
            <div style={{ marginTop: 30, marginBottom: 30 }} className="tables">
                <Tabs defaultActiveKey="1" className="tabs-form" type="card">
                    <TabPane className="tabs-panel" tab={<span> <Title level={4}>Users</Title> </span>} key="1">
                        <SmsUsersTable />
                    </TabPane>
                    <TabPane className="tabs-panel" tab={<span> <Title level={4}>Students</Title> </span>} key="2">
                        <SmsStudentsTable />
                    </TabPane>
                    <TabPane className="tabs-panel" tab={<span> <Title level={4}>Parents</Title> </span>} key="3">
                        <SmsParentsTable />
                    </TabPane>
                    <TabPane className="tabs-panel" tab={<span> <Title level={4}>Teachers</Title> </span>} key="4">
                        <SmsTeachersTable />
                    </TabPane>
                    <TabPane className="tabs-panel" tab={<span> <Title level={4}>Clients</Title> </span>} key="5">
                        <SmsClientsTable />
                    </TabPane>
                </Tabs>
            </div>
            <hr></hr>
            <div style={{ marginTop: 30, marginBottom: 30 }} className="tables">
                <Tabs defaultActiveKey="1" className="tabs-form" type="card">
                    <TabPane className="tabs-panel" tab={<span> <Title level={4}>Fees Collection</Title> </span>} key="1">
                        <SmsFeesCollectionTable />
                    </TabPane>
                    <TabPane className="tabs-panel" tab={<span> <Title level={4}>Expense</Title> </span>} key="2">
                        <SmsExpensesTable />
                    </TabPane>
                </Tabs>
            </div>
            <hr></hr>
            <div style={{ marginTop: 30, marginBottom: 30 }} className="tables">
                <Tabs defaultActiveKey="1" className="tabs-form" type="card">
                    <TabPane className="tabs-panel" tab={<span> <Title level={4}>Exam Result</Title> </span>} key="1">
                        <SmsExamResultsTable />
                    </TabPane>
                    <TabPane className="tabs-panel" tab={<span> <Title level={4}>Exam Schedule</Title> </span>} key="2">
                        <SmsExamScheduleTable />
                    </TabPane>
                </Tabs>
            </div>
            <hr></hr>
            <div style={{ marginTop: 30, marginBottom: 30 }} className="tables">
                <Tabs defaultActiveKey="1" className="tabs-form" type="card">
                    <TabPane className="tabs-panel" tab={<span> <Title level={4}>Hostel</Title> </span>} key="1">
                        <SmsHostelsTable />
                    </TabPane>
                    <TabPane className="tabs-panel" tab={<span> <Title level={4}>Transport</Title> </span>} key="2">
                        <SmsTransportsTable />
                    </TabPane>
                    <TabPane className="tabs-panel" tab={<span> <Title level={4}>Attendance</Title> </span>} key="3">
                        <SmsAttendancesTable />
                    </TabPane>
                </Tabs>
            </div>
        </Fragment>
    )
}

export default SmsTables