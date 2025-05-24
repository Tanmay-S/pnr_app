import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Appbar, Snackbar } from 'react-native-paper';
import { WebView, WebViewNavigation } from 'react-native-webview';

export default function IRCTCWebViewScreen() {
  const router = useRouter();
  const { pnr } = useLocalSearchParams<{ pnr: string }>();
  const webViewRef = useRef<WebView>(null);
  const [loading, setLoading] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [error, setError] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  // IRCTC PNR Status URL
  const irctcPNRUrl = 'https://www.indianrail.gov.in/enquiry/PNR/PnrEnquiry.html';

  const handleNavigationStateChange = (navState: WebViewNavigation) => {
    setCanGoBack(navState.canGoBack);
    setCanGoForward(navState.canGoForward);
    setLoading(navState.loading);
  };

  const handleError = () => {
    setError('Failed to load IRCTC website. Please check your internet connection.');
    setSnackbarVisible(true);
  };

  const handleGoBack = () => {
    if (canGoBack && webViewRef.current) {
      webViewRef.current.goBack();
    }
  };

  const handleGoForward = () => {
    if (canGoForward && webViewRef.current) {
      webViewRef.current.goForward();
    }
  };

  const handleRefresh = () => {
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  };

  const injectedJavaScript = `
    // Auto-fill PNR number if the input field is available
    (function() {
      const pnrNumber = "${pnr}";
      
      // Function to fill PNR input
      function fillPNRInput() {
        // Common selectors for PNR input fields
        const selectors = [
          'input[name="pnrno"]',
          'input[name="pnr"]',
          'input[id*="pnr"]',
          'input[placeholder*="PNR"]',
          'input[placeholder*="pnr"]',
          'input[type="text"]'
        ];
        
        for (let selector of selectors) {
          const input = document.querySelector(selector);
          if (input && input.type === 'text') {
            input.value = pnrNumber;
            input.focus();
            
            // Trigger input events
            input.dispatchEvent(new Event('input', { bubbles: true }));
            input.dispatchEvent(new Event('change', { bubbles: true }));
            
            console.log('PNR filled in input:', selector);
            break;
          }
        }
      }
      
      // Try to fill immediately
      fillPNRInput();
      
      // Also try after a short delay in case the page is still loading
      setTimeout(fillPNRInput, 1000);
      setTimeout(fillPNRInput, 2000);
      
      // Try again when DOM changes
      const observer = new MutationObserver(function(mutations) {
        fillPNRInput();
      });
      
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
      
      // Stop observing after 10 seconds
      setTimeout(() => observer.disconnect(), 10000);
    })();
    
    true; // Required for injected JavaScript
  `;

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title="IRCTC PNR Status" subtitle={`PNR: ${pnr}`} />
        <Appbar.Action icon="arrow-left" onPress={handleGoBack} disabled={!canGoBack} />
        <Appbar.Action icon="arrow-right" onPress={handleGoForward} disabled={!canGoForward} />
        <Appbar.Action icon="refresh" onPress={handleRefresh} />
      </Appbar.Header>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator animating={true} size="large" />
        </View>
      )}

      <WebView
        ref={webViewRef}
        source={{ uri: irctcPNRUrl }}
        style={styles.webview}
        onNavigationStateChange={handleNavigationStateChange}
        onError={handleError}
        injectedJavaScript={injectedJavaScript}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
        allowsBackForwardNavigationGestures={true}
        userAgent="Mozilla/5.0 (Linux; Android 10; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36"
      />

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={4000}
        action={{
          label: 'Retry',
          onPress: handleRefresh,
        }}
      >
        {error}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
    zIndex: 1,
  },
});
