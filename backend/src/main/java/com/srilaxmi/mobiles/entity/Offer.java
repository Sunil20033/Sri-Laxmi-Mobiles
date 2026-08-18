package com.srilaxmi.mobiles.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "offers")
public class Offer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // =========================
    // BASIC OFFER INFORMATION
    // =========================

    @Column(nullable = false)
    private String title;

    private String badge;

    private String freeText;


    // =========================
    // MAIN OFFER VISUAL
    // =========================

    private String mainVisualText;

    private String mainVisualIcon;

    private String mainVisualImage;


    // =========================
    // OFFER DATES
    // =========================

    @Column(nullable = false)
    private LocalDateTime startDate;

    @Column(nullable = false)
    private LocalDateTime endDate;


    // =========================
    // FREE ITEM 1
    // =========================

    private String freeItem1Name;

    private String freeItem1Image;

    private String freeItem1Text;


    // =========================
    // FREE ITEM 2
    // =========================

    private String freeItem2Name;

    private String freeItem2Image;

    private String freeItem2Text;

    // =========================
    // FREE ITEM 3
    // =========================

    private String freeItem3Name;

    private String freeItem3Image;

    private String freeItem3Text;


    // =========================
    // FREE ITEM 4
    // =========================

    private String freeItem4Name;

    private String freeItem4Image;

    private String freeItem4Text;


    // =========================
    // FREE ITEM 5
    // =========================

    private String freeItem5Name;

    private String freeItem5Image;

    private String freeItem5Text;

    // =========================
    // OFFER NOTE
    // =========================

    @Column(length = 1000)
    private String note;

    @Column(length = 500)
    private String shopMessage;


    // =========================
    // ACTIVE STATUS
    // =========================

    @Column(nullable = false)
    private Boolean active = true;


    // =========================
    // DEFAULT CONSTRUCTOR
    // =========================

    public Offer() {
    }


    // =========================
    // GETTERS / SETTERS
    // =========================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }


    public String getBadge() {
        return badge;
    }

    public void setBadge(String badge) {
        this.badge = badge;
    }


    public String getFreeText() {
        return freeText;
    }

    public void setFreeText(String freeText) {
        this.freeText = freeText;
    }


    // =========================
    // MAIN VISUAL GETTERS / SETTERS
    // =========================

    public String getMainVisualText() {
        return mainVisualText;
    }

    public void setMainVisualText(String mainVisualText) {
        this.mainVisualText = mainVisualText;
    }


    public String getMainVisualIcon() {
        return mainVisualIcon;
    }

    public void setMainVisualIcon(String mainVisualIcon) {
        this.mainVisualIcon = mainVisualIcon;
    }


    public String getMainVisualImage() {
        return mainVisualImage;
    }

    public void setMainVisualImage(String mainVisualImage) {
        this.mainVisualImage = mainVisualImage;
    }


    // =========================
    // DATES
    // =========================

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }


    public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }


    // =========================
    // FREE ITEM 1
    // =========================

    public String getFreeItem1Name() {
        return freeItem1Name;
    }

    public void setFreeItem1Name(String freeItem1Name) {
        this.freeItem1Name = freeItem1Name;
    }


    public String getFreeItem1Image() {
        return freeItem1Image;
    }

    public void setFreeItem1Image(String freeItem1Image) {
        this.freeItem1Image = freeItem1Image;
    }


    public String getFreeItem1Text() {
        return freeItem1Text;
    }

    public void setFreeItem1Text(String freeItem1Text) {
        this.freeItem1Text = freeItem1Text;
    }


    // =========================
    // FREE ITEM 2
    // =========================

    public String getFreeItem2Name() {
        return freeItem2Name;
    }

    public void setFreeItem2Name(String freeItem2Name) {
        this.freeItem2Name = freeItem2Name;
    }


    public String getFreeItem2Image() {
        return freeItem2Image;
    }

    public void setFreeItem2Image(String freeItem2Image) {
        this.freeItem2Image = freeItem2Image;
    }


    public String getFreeItem2Text() {
        return freeItem2Text;
    }

    public void setFreeItem2Text(String freeItem2Text) {
        this.freeItem2Text = freeItem2Text;
    }

    // =========================
    // FREE ITEM 3
    // =========================

    public String getFreeItem3Name() {
        return freeItem3Name;
    }

    public void setFreeItem3Name(String freeItem3Name) {
        this.freeItem3Name = freeItem3Name;
    }

    public String getFreeItem3Image() {
        return freeItem3Image;
    }

    public void setFreeItem3Image(String freeItem3Image) {
        this.freeItem3Image = freeItem3Image;
    }

    public String getFreeItem3Text() {
        return freeItem3Text;
    }

    public void setFreeItem3Text(String freeItem3Text) {
        this.freeItem3Text = freeItem3Text;
    }


    // =========================
    // FREE ITEM 4
    // =========================

    public String getFreeItem4Name() {
        return freeItem4Name;
    }

    public void setFreeItem4Name(String freeItem4Name) {
        this.freeItem4Name = freeItem4Name;
    }

    public String getFreeItem4Image() {
        return freeItem4Image;
    }

    public void setFreeItem4Image(String freeItem4Image) {
        this.freeItem4Image = freeItem4Image;
    }

    public String getFreeItem4Text() {
        return freeItem4Text;
    }

    public void setFreeItem4Text(String freeItem4Text) {
        this.freeItem4Text = freeItem4Text;
    }


    // =========================
    // FREE ITEM 5
    // =========================

    public String getFreeItem5Name() {
        return freeItem5Name;
    }

    public void setFreeItem5Name(String freeItem5Name) {
        this.freeItem5Name = freeItem5Name;
    }

    public String getFreeItem5Image() {
        return freeItem5Image;
    }

    public void setFreeItem5Image(String freeItem5Image) {
        this.freeItem5Image = freeItem5Image;
    }

    public String getFreeItem5Text() {
        return freeItem5Text;
    }

    public void setFreeItem5Text(String freeItem5Text) {
        this.freeItem5Text = freeItem5Text;
    }

    // =========================
    // NOTE
    // =========================

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }


    public String getShopMessage() {
        return shopMessage;
    }

    public void setShopMessage(String shopMessage) {
        this.shopMessage = shopMessage;
    }


    // =========================
    // ACTIVE
    // =========================

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }
}