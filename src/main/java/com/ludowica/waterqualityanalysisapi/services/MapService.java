package com.ludowica.waterqualityanalysisapi.services;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.ludowica.waterqualityanalysisapi.models.WaterInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

@Service
public class MapService {

    @Autowired
    ArcGISAuthService arcGISAuthService;

    @Value("${esri.arcgis.org-id}")
    private String orgId;

    @Value("${esri.arcgis.feature-map}")
    private String mapName;

    private String accessToken = null;


    public void initMap(List<WaterInfo> waterInfoList) {

        accessToken = arcGISAuthService.getAccessToken();

        JsonArray waterInfoJsonArray = prepareFeatures(waterInfoList);

        addFeatures(waterInfoJsonArray);
    }


    private JsonArray prepareFeatures(List<WaterInfo> waterInfoList) {

        JsonArray waterInfoJsonArray = new JsonArray();

        for (WaterInfo waterInfo : waterInfoList) {

            JsonObject json = new JsonObject();
            JsonObject geometry = new JsonObject();
            JsonObject attributes = new JsonObject();

            geometry.addProperty("x", waterInfo.getLocation().getLongitude());
            geometry.addProperty("y", waterInfo.getLocation().getLatitude());

            attributes.addProperty("name", waterInfo.getLocation().getName());
            attributes.addProperty("id", waterInfo.getId());
            attributes.addProperty("date", waterInfo.getDate().toString());
            attributes.addProperty("longitude", waterInfo.getLocation().getLongitude());
            attributes.addProperty("latitude", waterInfo.getLocation().getLatitude());

            json.add("geometry", geometry);
            json.add("attributes", attributes);

            waterInfoJsonArray.add(json);
        }

        return waterInfoJsonArray;
    }


    private void addFeatures(JsonArray waterInfoJsonArray) {

        String url = "https://services6.arcgis.com/" + orgId + "/ArcGIS/rest/services/" + mapName + "/FeatureServer/0/applyEdits";

        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        LinkedMultiValueMap<String, Object> params = new LinkedMultiValueMap<>();
        params.add("f", "json");
        params.add("token", accessToken);
        params.add("adds", waterInfoJsonArray.toString());

        HttpEntity requestEntity = new HttpEntity<>(params, headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {

            JsonObject jsonObject = new JsonParser().parse(response.getBody()).getAsJsonObject();
            JsonArray jsonArray = jsonObject.get("addResults").getAsJsonArray();
        }

    }


}
