package com.ludowica.waterqualityanalysisapi.controllers;

import com.ludowica.waterqualityanalysisapi.services.WorkbookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/workbooks")
public class WorkbookController {

    @Autowired
    WorkbookService workbookService;

    @GetMapping
    public void populate() {
        workbookService.readExcel();
    }

}
