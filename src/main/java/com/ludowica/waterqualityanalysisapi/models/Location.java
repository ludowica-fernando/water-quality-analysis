package com.ludowica.waterqualityanalysisapi.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Location {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String city;
    private double longitude;
    private double latitude;

    @OneToMany(mappedBy = "location", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("location")
    private Set<WaterInfo> waterInfoSet;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public Set<WaterInfo> getWaterInfoSet() {
        return waterInfoSet;
    }

    public void setWaterInfoSet(Set<WaterInfo> waterInfoSet) {
        this.waterInfoSet = waterInfoSet;
    }
}
