package sueprtizen.smartclothing.domain.calendar.service;

import sueprtizen.smartclothing.domain.calendar.dto.CalendarMonthlyScheduleResponseDTO;

public interface CalendarService {
    CalendarMonthlyScheduleResponseDTO calendarMonthlySchedules(
            int userId,
            String startDate,
            String endDate
    );
}
