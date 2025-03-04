import { ApplicationInsights } from '@microsoft/applicationinsights-web';

// The correlation ID can be:
// - Generated on the server side for user session
// - Retrieved from cookies
// - Stored in browser's local/session storage
// For this example, we're using a hardcoded value
const correlationId = 'abcd123';

const appInsights = new ApplicationInsights({
    config: {
        instrumentationKey: 'INSTRUMENTATION KEY',
        enableAutoRouteTracking: true, // Optional: Enables automatic route tracking for Single Page Applications
        loggingLevelConsole: 2 // 0: OFF, 1: ERROR, 2: WARN, 3: INFO, 4: DEBUG
    }
});
appInsights.loadAppInsights();

// Add correlation ID to all telemetry
appInsights.addTelemetryInitializer((envelope) => {
    envelope.tags = envelope.tags || {};
    envelope.data.properties = envelope.data.properties || {};
    envelope.data.properties.correlationId = correlationId;
});

appInsights.trackPageView({
    properties: {
        correlationId: correlationId
    }
}); 

// Automatically collect unhandled exceptions with correlation ID
window.onerror = function (message, source, lineno, colno, error) {
    appInsights.trackException({
        error: error,
        properties: {
            correlationId: correlationId
        }
    });
};

// Manually track a custom exception with correlation ID
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