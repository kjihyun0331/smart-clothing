package sueprtizen.smartclothing.domain.calendar.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sueprtizen.smartclothing.domain.calendar.dto.CalendarMonthlyScheduleResponseDTO;
import sueprtizen.smartclothing.domain.calendar.service.CalendarService;
import sueprtizen.smartclothing.global.dto.Message;

@RequestMapping("/calendar")
@RestController
@RequiredArgsConstructor
public class CalendarController {

    final CalendarService calendarService;

    @GetMapping()
    public ResponseEntity<Message<CalendarMonthlyScheduleResponseDTO>> clothingConfirm(
            @RequestHeader("User-ID") int userId,
            @RequestParam String startDate,
            @RequestParam String endDate
    ) {
        CalendarMonthlyScheduleResponseDTO calendarMonthlyScheduleResponseDTO = calendarService.calendarMonthlySchedules(userId, startDate, endDate);
        return ResponseEntity.ok(Message.success(calendarMonthlyScheduleResponseDTO));
    }
}
