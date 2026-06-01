/**
 * @fileoverview Utilidad refactorizada de generación de URLs del Catastro .
 */

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

/**
 * Value Object que representa y valida una Referencia Catastral española.
 */
export class CatastralRef {
  private readonly value: string;

  constructor(rawValue: string) {
    if (typeof rawValue !== 'string') {
      throw new TypeError('La referencia catastral debe ser una cadena de texto');
    }

    const cleaned = rawValue.trim().replace(/\s+/g, '').toUpperCase();
    if (cleaned.length !== 20) {
      throw new Error(
        `Referencia catastral inválida: se esperaban 20 caracteres, se recibieron ${cleaned.length}`,
      );
    }

    this.value = cleaned;
  }

  public getFull(): string {
    return this.value;
  }

  public getParcela(): string {
    return this.value.substring(0, 14);
  }

  public isRustico(): boolean {
    // Rústico: 5 dígitos seguidos de una letra (ej: 16256A...)
    return /^[0-9]{5}[A-Z]/.test(this.value);
  }

  public getUrbRusCode(): 'R' | 'U' {
    return this.isRustico() ? 'R' : 'U';
  }

  /**
   * Intenta extraer una referencia catastral válida de un objeto subasta
   * (probando el campo explícito y escaneando el texto bruto como fallback).
   */
  public static fromSubasta(subasta: {
    referenciaCatastral?: string | null;
    textoBruto?: string | null;
    texto?: string | null;
  }): CatastralRef | null {
    const normalize = (raw: string): string | null => {
      const cleaned = raw.replace(/\s+/g, '').toUpperCase();
      return cleaned.length === 20 ? cleaned : null;
    };

    // 1. Intentar con el campo explícito de referencia catastral
    if (subasta.referenciaCatastral) {
      const joined = subasta.referenciaCatastral.replace(/\s+/g, '').toUpperCase();
      const candidates = subasta.referenciaCatastral.split(/[,;]+/);
      for (const c of candidates) {
        const result = normalize(c);
        if (result) return new CatastralRef(result);
      }
      if (joined.length === 20) {
        return new CatastralRef(joined);
      }
    }

    // 2. Fallback: buscar en el texto bruto de la subasta
    const texto = subasta.textoBruto || subasta.texto || '';
    if (texto) {
      const match = texto.match(/Ref\.?\s*Catastral[:\s]*([A-Z0-9](?:\s*[A-Z0-9]){19})/i);
      if (match && match[1]) {
        const result = normalize(match[1]);
        if (result) return new CatastralRef(result);
      }
      const loose = texto.match(/\b([A-Z0-9]{20})\b/i);
      if (loose && loose[1]) {
        return new CatastralRef(loose[1]);
      }
    }

    return null;
  }
}

/**
 * Generador de URLs para la Sede Electrónica del Catastro.
 */
export class CatastralUrlBuilder {
  private readonly apiBase: string;

  constructor(apiBase: string = API_BASE_URL) {
    this.apiBase = apiBase;
  }

  /**
   * Genera la URL para acceder a la ficha del inmueble a través de nuestro endpoint proxy de redirección.
   */
  public buildFichaUrl(ref: CatastralRef): string {
    return `${this.apiBase}/catastro/ficha/${ref.getFull()}`;
  }

  /**
   * Genera la URL directa al visor del mapa cartográfico del Catastro (no requiere delegación/municipio).
   */
  public buildMapUrl(ref: CatastralRef): string {
    const baseUrl = 'https://www1.sedecatastro.gob.es/Cartografia/mapa.aspx';
    const params = new URLSearchParams({
      refcat: ref.getParcela(),
      from: 'OVCBusqueda',
      pest: 'rc',
      final: '',
      RCCompleta: ref.getFull(),
      ZV: 'NO',
      ZR: 'NO',
      anyoZV: '',
      tematicos: '',
      anyotem: '',
      historica: '',
      coordinadas: '',
    });

    return `${baseUrl}?${params.toString()}`;
  }

  /**
   * Genera la URL de la imagen del plano parcelario usando nuestro endpoint backend.
   */
  public buildImageUrl(ref: CatastralRef): string {
    return `${this.apiBase}/catastro/imagen/${ref.getFull()}`;
  }

  /**
   * Genera la URL de la imagen satélite (ortofoto) usando nuestro endpoint backend.
   */
  public buildSatelliteImageUrl(ref: CatastralRef): string {
    return `${this.apiBase}/catastro/satelite/${ref.getFull()}`;
  }

  /**
   * Genera la URL de la imagen de fachada usando nuestro endpoint backend.
   */
  public buildFacadeImageUrl(ref: CatastralRef): string {
    return `${this.apiBase}/catastro/fachada/${ref.getFull()}`;
  }
}

// Singleton Builder preconfigurado
const defaultBuilder = new CatastralUrlBuilder();

/**
 * Wrapper de compatibilidad para construir la URL de ficha.
 */
export function buildCatastralUrl(refCatastral: string): string {
  const ref = new CatastralRef(refCatastral);
  return defaultBuilder.buildFichaUrl(ref);
}

/**
 * Wrapper de compatibilidad para construir la URL del mapa.
 */
export function buildCatastralMapUrl(refCatastral: string): string {
  const ref = new CatastralRef(refCatastral);
  return defaultBuilder.buildMapUrl(ref);
}

/**
 * Wrapper de compatibilidad para construir la URL de la imagen del plano.
 */
export function buildCatastralImageUrl(refCatastral: string): string {
  const ref = new CatastralRef(refCatastral);
  return defaultBuilder.buildImageUrl(ref);
}

/**
 * Wrapper de compatibilidad para construir la URL de la imagen satélite.
 */
export function buildCatastralSatelliteUrl(refCatastral: string): string {
  const ref = new CatastralRef(refCatastral);
  return defaultBuilder.buildSatelliteImageUrl(ref);
}

/**
 * Wrapper de compatibilidad para construir la URL de la foto de fachada.
 */
export function buildCatastralFacadeUrl(refCatastral: string): string {
  const ref = new CatastralRef(refCatastral);
  return defaultBuilder.buildFacadeImageUrl(ref);
}


