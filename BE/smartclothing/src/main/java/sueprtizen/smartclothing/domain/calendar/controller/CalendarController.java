package sueprtizen.smartclothing.domain.calendar.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sueprtizen.smartclothing.domain.calendar.dto.*;
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

    @PostMapping()
    public ResponseEntity<Message<Void>> scheduleSave(
            @RequestHeader("User-ID") int userId,
            @RequestBody ScheduleSaveRequestDTO scheduleSaveRequestDTO

    ) {
        calendarService.scheduleSave(userId, scheduleSaveRequestDTO);
        return ResponseEntity.ok(Message.success());
    }

    @GetMapping("/detail")
    public ResponseEntity<Message<ScheduleDetailResponseDTO>> scheduleConfirmation(
            @RequestHeader("User-ID") int userId,
            @RequestParam String date
    ) {
        return ResponseEntity.ok(Message.success(calendarService.scheduleConfirmation(userId, date)));
    }


    @GetMapping("/date")
    public ResponseEntity<Message<ScheduleOutfitResponseDTO>> scheduleOutfitConfirmation(
            @RequestHeader("User-ID") int userId,
            @RequestParam String date
    ) {
        return ResponseEntity.ok(Message.success(calendarService.scheduleOutfitConformation(userId, date)));
    }

    @GetMapping("/exists")
    public ResponseEntity<Message<ScheduleCheckingResponseDTO>> scheduleCheck(
            @RequestHeader("User-ID") int userId,
            @RequestParam String date
    ) {
        return ResponseEntity.ok(Message.success(calendarService.scheduleChecking(userId, date)));
    }


    @DeleteMapping
    public ResponseEntity<Message<Void>> scheduleDelete(
            @RequestHeader("User-ID") int userId,
            @RequestParam String date
    ) {
        calendarService.scheduleDelete(userId, date);
        return ResponseEntity.ok(Message.success());
    }
}
