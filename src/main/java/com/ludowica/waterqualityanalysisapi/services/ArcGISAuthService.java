package com.ludowica.waterqualityanalysisapi.services;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
public class ArcGISAuthService {

    @Value("${esri.arcgis.clientId}")
    private String clientId;

    @Value("${esri.arcgis.clientSecret}")
    private String clientSecret;

    @Value("${esri.arcgis.grantType}")
    private String grantType;

    private String accessToken = null;


    public String getAccessToken() {

        String url = "https://www.arcgis.com/sharing/rest/oauth2/token";
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        LinkedMultiValueMap<String, Object> params = new LinkedMultiValueMap<>();
        params.add("client_id", clientId);
        params.add("client_secret", clientSecret);
        params.add("grant_type", grantType);

        HttpEntity requestEntity = new HttpEntity<>(params, headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {

            JsonObject jsonObject = new JsonParser().parse(response.getBody()).getAsJsonObject();
            accessToken = jsonObject.get("access_token").getAsString();
        }

        return accessToken;
    }
}
