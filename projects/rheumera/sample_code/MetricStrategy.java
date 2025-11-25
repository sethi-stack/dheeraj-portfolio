package com.rheumera.service.metrics;

import com.rheumera.model.MetricType;
import com.rheumera.model.PatientMetric;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * Demonstrates the Strategy Pattern to handle different metric types
 * (Pain, Fatigue, Medication) without a massive if/else block.
 */
@Service
public class MetricProcessingService {

    private final Map<MetricType, MetricStrategy> strategies;

    public MetricProcessingService(List<MetricStrategy> strategyList) {
        // Automatically injects all implementations of MetricStrategy
        this.strategies = strategyList.stream()
                .collect(Collectors.toMap(MetricStrategy::getType, Function.identity()));
    }

    public void processMetric(PatientMetric metric) {
        MetricStrategy strategy = strategies.get(metric.getType());
        
        if (strategy == null) {
            throw new UnsupportedOperationException("No strategy for type: " + metric.getType());
        }
        
        // Execute the specific logic (e.g., alert if pain > 8, or check med compliance)
        strategy.analyze(metric);
    }
}

interface MetricStrategy {
    MetricType getType();
    void analyze(PatientMetric metric);
}

@Service
class PainMetricStrategy implements MetricStrategy {
    @Override
    public MetricType getType() { return MetricType.PAIN; }

    @Override
    public void analyze(PatientMetric metric) {
        if (metric.getValue() > 8) {
            alertDoctor(metric);
        }
    }
    
    private void alertDoctor(PatientMetric metric) {
        // Logic to trigger a high-priority alert
    }
}
