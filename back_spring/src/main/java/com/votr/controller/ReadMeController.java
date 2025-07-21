package com.votr.controller;

import com.votr.service.ReadMeService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ReadMeController {
    private ReadMeService readMeService;

    public ReadMeController(ReadMeService readMeService) {
        this.readMeService = readMeService;
    }

    @GetMapping("/readme")
    public String showReadMe() {
        // This controller is intentionally left empty.
        // It serves as a placeholder for future development or documentation purposes.

        return "This is JB's Vocal Training Service.";
    }
}
