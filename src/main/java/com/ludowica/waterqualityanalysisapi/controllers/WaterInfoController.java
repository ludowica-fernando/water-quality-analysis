package com.ludowica.waterqualityanalysisapi.controllers;

import com.ludowica.waterqualityanalysisapi.models.WaterInfo;
import com.ludowica.waterqualityanalysisapi.repository.WaterInfoRepo;
import com.ludowica.waterqualityanalysisapi.services.WaterInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/water-info")
public class WaterInfoController {

    @Autowired
    WaterInfoRepo repo;

    @Autowired
    WaterInfoService waterInfoService;

//    @GetMapping("/{id}")
//    public ResponseEntity<?> get(@PathVariable int id) {
//        ShoppingCart shoppingCart = checkoutService.doCheckOut(id);
//        return new ResponseEntity<>(shoppingCart, HttpStatus.OK);
//    }

    @GetMapping
    public ResponseEntity<?> getAll() {
        List<WaterInfo> waterInfoList = waterInfoService.getAll();
        return new ResponseEntity<>(waterInfoList, HttpStatus.OK);
    }

    @GetMapping("/init-map")
    public ResponseEntity<?> initMap() {
        waterInfoService.initMap();
        return new ResponseEntity<>("", HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> addOrUpdate(@RequestBody WaterInfo waterInfo) {
        WaterInfo savedWaterInfo = repo.save(waterInfo);
        return new ResponseEntity<>(savedWaterInfo, HttpStatus.OK);
    }
}
