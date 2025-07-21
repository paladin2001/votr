package com.votr.controller;

import com.votr.service.LipTrillService;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LipTrillController {
    private LipTrillService lipTrillService;
    public LipTrillController(LipTrillService lipTrillService) {
        this.lipTrillService = lipTrillService;
    }

    @GetMapping("/liptrill")
    public String readme(Model model) {

        model.addAttribute("message","This is JB's Vocal Training Service. This is the lip trill page.");
        model.addAttribute("buttonText","Training");
        return "readme";
    }

    @PostMapping("/start-liptrill")
    public String handleLipTrillStart(Model model) {

        return "redirect:/liptrill-started";
    }


}
