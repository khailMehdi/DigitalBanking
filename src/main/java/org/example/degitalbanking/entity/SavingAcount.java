package org.example.degitalbanking.entity;

import jakarta.persistence.DiscriminatorValue;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @NoArgsConstructor @AllArgsConstructor
@DiscriminatorValue("SA")
public class SavingAcount extends BankAccount{
    private double intersetRate;
}
