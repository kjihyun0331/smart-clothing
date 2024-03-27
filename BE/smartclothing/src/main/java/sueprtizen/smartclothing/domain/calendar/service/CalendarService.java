package sueprtizen.smartclothing.domain.calendar.service;

import sueprtizen.smartclothing.domain.calendar.dto.CalendarMonthlyScheduleResponseDTO;
import sueprtizen.smartclothing.domain.calendar.dto.ScheduleSaveRequestDTO;

public interface CalendarService {
    CalendarMonthlyScheduleResponseDTO calendarMonthlySchedules(
            int userId,
            String startDate,
            String endDate
    );

    void scheduleSave(
            int userId,
            ScheduleSaveRequestDTO scheduleSaveRequestDTO
    );

//    void scheduleDelete(
//            int userId,
//            int scheduleId
//    );
}
