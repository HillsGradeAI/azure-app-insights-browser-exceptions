import { ApplicationInsights } from '@microsoft/applicationinsights-web';

// Add correlation ID constant
const correlationId = 'abcd123';

const appInsights = new ApplicationInsights({
    config: {
        instrumentationKey: 'INSTRUMENTATION KEY',
        enableAutoRouteTracking: true, // Optional: Enables automatic route tracking for Single Page Applications
        loggingLevelConsole: 2 // Enable debug logging
    }
});
appInsights.loadAppInsights();

// Add correlation ID to all telemetry
appInsights.addTelemetryInitializer((envelope) => {
    envelope.tags = envelope.tags || {};
    envelope.data.properties = envelope.data.properties || {};
    envelope.data.properties.correlationId = correlationId;
});

// Update trackPageView to include correlation ID
appInsights.trackPageView({
    properties: {
        correlationId: correlationId
    }
}); 

// Update automatic exception tracking to include correlation ID
window.onerror = function (message, source, lineno, colno, error) {
    appInsights.trackException({
        error: error,
        properties: {
            correlationId: correlationId
        }
    });
};

// Update manual exception tracking to include correlation ID
try {
    // Simulate an error
    throw new Error('This is a custom error');
} catch (error) {
    appInsights.trackException({
        error: error,
        properties: {
            correlationId: correlationId
        }
    });
}
