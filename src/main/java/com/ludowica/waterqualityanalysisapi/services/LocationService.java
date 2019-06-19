package com.ludowica.waterqualityanalysisapi.services;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.ludowica.waterqualityanalysisapi.models.Location;
import com.ludowica.waterqualityanalysisapi.repository.LocationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class LocationService {

    String baseURL = "https://api.opencagedata.com/geocode/v1/json?q=";
    String apiKey = "&key=c6cba34aa4e34d51bd425f2f1fcbe184";
    String optParams = "&countrycode=LK";

    @Autowired
    LocationRepo locationRepo;

    public Location addOrUpdate(Location location){
        return locationRepo.save(location);
    }

    public Location getLatLong(Location location) {

        String url = baseURL + location.getName() + apiKey + optParams;
        RestTemplate restTemplate = new RestTemplate();

        String result = restTemplate.getForObject(url, String.class);

        JsonObject jsonObject = new JsonParser().parse(result).getAsJsonObject();
        JsonArray jsonArray = jsonObject.get("results").getAsJsonArray();

        if (jsonArray.size() != 0) {

            JsonObject latlong = jsonArray.get(0)
                    .getAsJsonObject().get("geometry")
                    .getAsJsonObject();

            location.setLatitude(latlong.get("lat").getAsDouble());
            location.setLongitude(latlong.get("lng").getAsDouble());
        }


        return location;
    }
}
