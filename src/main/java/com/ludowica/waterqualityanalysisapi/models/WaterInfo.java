package com.ludowica.waterqualityanalysisapi.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.Date;

@Entity
public class WaterInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @JsonFormat(pattern = "dd-MM-yyyy hh:mm:ss", timezone = "Asia/Colombo")
    private Date date;

    @ManyToOne
    @JoinColumn
    @JsonIgnoreProperties("waterInfoSet")
    private Location location;

    private double HW;
    private double RCI;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public double getHW() {
        return HW;
    }

    public void setHW(double HW) {
        this.HW = HW;
    }

    public double getRCI() {
        return RCI;
    }

    public void setRCI(double RCI) {
        this.RCI = RCI;
    }

}
