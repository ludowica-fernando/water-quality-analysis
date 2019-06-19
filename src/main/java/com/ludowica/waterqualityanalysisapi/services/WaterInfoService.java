package com.ludowica.waterqualityanalysisapi.services;

import com.ludowica.waterqualityanalysisapi.models.WaterInfo;
import com.ludowica.waterqualityanalysisapi.repository.WaterInfoRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class WaterInfoService {

    @Autowired
    WaterInfoRepo waterInfoRepo;

    @Autowired
    MapService mapService;

    public WaterInfo addOrUpdate(WaterInfo waterInfo) {
        waterInfo.setDate(retrieveDate());
        return waterInfoRepo.save(waterInfo);
    }

    public WaterInfo addFromWorkBook(WaterInfo waterInfo) {
        return waterInfoRepo.save(waterInfo);
    }

    public List<WaterInfo> getAll() {
        return waterInfoRepo.findAll();
    }

    public void initMap() {
        List<WaterInfo> waterInfoList = getAll();
        mapService.initMap(waterInfoList);
    }


    private Date retrieveDate() {

        Date date = new Date();

        DateFormat df = new SimpleDateFormat("dd-MM-yyyy hh:mm:ss");
        String strDate = df.format(date);

        Date newDate = null;
        try {
            newDate = df.parse(strDate);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        return newDate;
    }
}
