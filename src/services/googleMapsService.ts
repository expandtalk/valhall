
declare global {
  interface Window {
    google: any;
  }
}

export class GoogleMapsService {
  private static instance: GoogleMapsService;
  private isLoaded = false;
  private loadPromise: Promise<void> | null = null;

  static getInstance(): GoogleMapsService {
    if (!GoogleMapsService.instance) {
      GoogleMapsService.instance = new GoogleMapsService();
    }
    return GoogleMapsService.instance;
  }

  async loadGoogleMaps(apiKey: string): Promise<void> {
    if (this.isLoaded) {
      return;
    }

    if (this.loadPromise) {
      return this.loadPromise;
    }

    this.loadPromise = new Promise((resolve, reject) => {
      // Check if already loaded
      if (window.google && window.google.maps) {
        this.isLoaded = true;
        resolve();
        return;
      }

      // Create script element
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        this.isLoaded = true;
        resolve();
      };

      script.onerror = () => {
        reject(new Error('Failed to load Google Maps'));
      };

      document.head.appendChild(script);
    });

    return this.loadPromise;
  }

  isGoogleMapsLoaded(): boolean {
    return this.isLoaded && window.google && window.google.maps;
  }

  getGoogleMapsAPI() {
    if (!this.isGoogleMapsLoaded()) {
      throw new Error('Google Maps not loaded');
    }
    return {
      Map: window.google.maps.Map,
      Marker: window.google.maps.Marker,
      InfoWindow: window.google.maps.InfoWindow,
      LatLng: window.google.maps.LatLng,
      Size: window.google.maps.Size,
    };
  }
}
