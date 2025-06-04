import {  ScheduleComponent,  Day,  Week,  WorkWeek,  Month,  Agenda,  Inject,
  ViewsDirective,  ViewDirective,  EventSettingsModel } from '@syncfusion/ej2-react-schedule';

export default function Scheduler() {

  return (
    <ScheduleComponent
      style={{ marginTop: '100px'   }}
    >
        <ViewsDirective>
            <ViewDirective option="Day" />
            <ViewDirective option="Week" />
            <ViewDirective option="WorkWeek" />
            <ViewDirective option="Month"/>
        </ViewsDirective>
      <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
    </ScheduleComponent>
  );
}
