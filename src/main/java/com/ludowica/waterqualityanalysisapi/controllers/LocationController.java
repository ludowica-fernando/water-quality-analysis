package com.ludowica.waterqualityanalysisapi.controllers;

import com.ludowica.waterqualityanalysisapi.models.Location;
import com.ludowica.waterqualityanalysisapi.repository.LocationRepo;
import com.ludowica.waterqualityanalysisapi.services.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/locations")
public class LocationController {

    @Autowired
    LocationRepo locationRepo;

    @Autowired
    LocationService locationService;

    @GetMapping
    public List<Location> getAllLocations(){
        return locationRepo.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Location> getLocation(@PathVariable int id){
        return locationRepo.findById(id);
    }

    @PostMapping
    public Location addOrUpdate(@RequestBody Location location){
        return locationService.addOrUpdate(location);
    }
}
