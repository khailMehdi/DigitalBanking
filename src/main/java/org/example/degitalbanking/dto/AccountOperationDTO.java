package org.example.degitalbanking.dto;

import lombok.Data;
import org.example.degitalbanking.enums.OperationType;

import java.util.Date;
@Data
public class AccountOperationDTO {
    private Long id;
    private Date operationDate;
    private double amount;
    private OperationType type;
    private String description;
}
