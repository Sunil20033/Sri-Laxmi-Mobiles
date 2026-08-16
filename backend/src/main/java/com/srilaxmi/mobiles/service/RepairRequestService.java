package com.srilaxmi.mobiles.service;

import com.srilaxmi.mobiles.entity.RepairRequest;
import com.srilaxmi.mobiles.repository.RepairRequestRepository;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RepairRequestService {

    private final RepairRequestRepository repairRequestRepository;


    public RepairRequestService(
            RepairRequestRepository repairRequestRepository
    ) {

        this.repairRequestRepository =
                repairRequestRepository;
    }


    // =========================
    // GET ALL REPAIR REQUESTS
    // =========================

    public List<RepairRequest> getAllRepairRequests() {

        return repairRequestRepository.findAll();
    }


    // =========================
    // GET REPAIR REQUEST BY ID
    // =========================

    public Optional<RepairRequest> getRepairRequestById(
            Long id
    ) {

        return repairRequestRepository.findById(id);
    }


    // =========================
    // CREATE REPAIR REQUEST
    // =========================

    public RepairRequest createRepairRequest(
            RepairRequest repairRequest
    ) {

        validateRepairRequest(repairRequest);

        repairRequest.setStatus("PENDING");

        return repairRequestRepository.save(
                repairRequest
        );
    }


    // =========================
    // UPDATE STATUS
    // =========================

    public RepairRequest updateStatus(
            Long id,
            String status
    ) {

        if (status == null || status.trim().isEmpty()) {

            throw new IllegalArgumentException(
                    "Status is required."
            );
        }


        String cleanedStatus =
                status.trim().toUpperCase();


        if (
                !cleanedStatus.equals("PENDING") &&
                !cleanedStatus.equals("COMPLETED") &&
                !cleanedStatus.equals("CANCELLED")
        ) {

            throw new IllegalArgumentException(
                    "Invalid repair request status."
            );
        }


        RepairRequest repairRequest =
                repairRequestRepository
                        .findById(id)
                        .orElseThrow(
                                () ->
                                        new RuntimeException(
                                                "Repair request not found with id: "
                                                        + id
                                        )
                        );


        repairRequest.setStatus(
                cleanedStatus
        );


        return repairRequestRepository.save(
                repairRequest
        );
    }


    // =========================
    // DELETE REPAIR REQUEST
    // =========================

    public void deleteRepairRequest(Long id) {

        if (!repairRequestRepository.existsById(id)) {

            throw new RuntimeException(
                    "Repair request not found with id: " + id
            );
        }

        repairRequestRepository.deleteById(id);
    }


    // =========================
    // VALIDATION
    // =========================

    private void validateRepairRequest(
            RepairRequest repairRequest
    ) {

        if (repairRequest == null) {

            throw new IllegalArgumentException(
                    "Repair request data is required."
            );
        }


        // NAME

        if (
                repairRequest.getName() == null ||
                repairRequest.getName().trim().isEmpty()
        ) {

            throw new IllegalArgumentException(
                    "Name is required."
            );
        }


        // PHONE

        if (
                repairRequest.getPhone() == null ||
                !repairRequest
                        .getPhone()
                        .trim()
                        .matches("[0-9]{10}")
        ) {

            throw new IllegalArgumentException(
                    "Phone number must contain exactly 10 digits."
            );
        }


        // MODEL

        if (
                repairRequest.getModel() == null ||
                repairRequest.getModel().trim().isEmpty()
        ) {

            throw new IllegalArgumentException(
                    "Mobile brand or model is required."
            );
        }


        // SERVICE

        if (
                repairRequest.getService() == null ||
                repairRequest.getService().trim().isEmpty()
        ) {

            throw new IllegalArgumentException(
                    "Service is required."
            );
        }


        // PROBLEM

        if (
                repairRequest.getProblem() == null ||
                repairRequest.getProblem().trim().isEmpty()
        ) {

            throw new IllegalArgumentException(
                    "Problem description is required."
            );
        }


        // NORMALISE VALUES

        repairRequest.setName(
                repairRequest.getName().trim()
        );

        repairRequest.setPhone(
                repairRequest.getPhone().trim()
        );

        repairRequest.setModel(
                repairRequest.getModel().trim()
        );

        repairRequest.setService(
                repairRequest.getService().trim()
        );

        repairRequest.setProblem(
                repairRequest.getProblem().trim()
        );


        // OPTIONAL FIELD

        if (
                repairRequest.getPreferredTime() != null
        ) {

            String preferredTime =
                    repairRequest
                            .getPreferredTime()
                            .trim();

            repairRequest.setPreferredTime(
                    preferredTime.isEmpty()
                            ? null
                            : preferredTime
            );
        }
    }
}