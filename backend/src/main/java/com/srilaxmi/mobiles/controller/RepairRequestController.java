package com.srilaxmi.mobiles.controller;

import com.srilaxmi.mobiles.entity.RepairRequest;
import com.srilaxmi.mobiles.service.RepairRequestService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/repair-requests")
@CrossOrigin(origins = "http://localhost:5173")
public class RepairRequestController {

    private final RepairRequestService repairRequestService;


    public RepairRequestController(
            RepairRequestService repairRequestService
    ) {

        this.repairRequestService =
                repairRequestService;
    }


    // =========================
    // GET ALL REPAIR REQUESTS
    // =========================

    @GetMapping
    public ResponseEntity<List<RepairRequest>>
    getAllRepairRequests() {

        List<RepairRequest> requests =
                repairRequestService
                        .getAllRepairRequests();

        return ResponseEntity.ok(requests);
    }


    // =========================
    // GET REPAIR REQUEST BY ID
    // =========================

    @GetMapping("/{id}")
    public ResponseEntity<RepairRequest>
    getRepairRequestById(
            @PathVariable Long id
    ) {

        Optional<RepairRequest> request =
                repairRequestService
                        .getRepairRequestById(id);

        return request
                .map(ResponseEntity::ok)
                .orElseGet(
                        () ->
                                ResponseEntity
                                        .notFound()
                                        .build()
                );
    }


    // =========================
    // CREATE REPAIR REQUEST
    // =========================

    @PostMapping
    public ResponseEntity<?> createRepairRequest(
            @RequestBody RepairRequest repairRequest
    ) {

        try {

            RepairRequest savedRequest =
                    repairRequestService
                            .createRepairRequest(
                                    repairRequest
                            );

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(savedRequest);

        } catch (IllegalArgumentException exception) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            exception.getMessage()
                    );
        }
    }


    // =========================
    // UPDATE STATUS
    // =========================

    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(
            @PathVariable Long id,
            @RequestBody String status
    ) {

        try {

            String cleanedStatus =
                    status
                            .replace("\"", "")
                            .trim();


            RepairRequest updatedRequest =
                    repairRequestService
                            .updateStatus(
                                    id,
                                    cleanedStatus
                            );


            return ResponseEntity.ok(
                    updatedRequest
            );


        } catch (IllegalArgumentException exception) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            exception.getMessage()
                    );


        } catch (RuntimeException exception) {

            return ResponseEntity
                    .notFound()
                    .build();
        }
    }


    // =========================
    // DELETE REPAIR REQUEST
    // =========================

    @DeleteMapping("/{id}")
    public ResponseEntity<Void>
    deleteRepairRequest(
            @PathVariable Long id
    ) {

        try {

            repairRequestService
                    .deleteRepairRequest(id);

            return ResponseEntity
                    .noContent()
                    .build();

        } catch (RuntimeException exception) {

            return ResponseEntity
                    .notFound()
                    .build();
        }
    }
}