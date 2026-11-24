# Reporte mensual para clientes con mantenimiento

Convierte la mensualidad de "algo abstracto que se paga" en "un servicio
que se ve que trae resultados". Pensado para mandar junto con el cobro
de cada mes (por email o WhatsApp, lo que uses habitualmente con el
cliente).

## Cómo obtener los datos

1. Activar Google Analytics 4 (gratis) en el sitio del cliente: crear la
   propiedad en [analytics.google.com](https://analytics.google.com),
   copiar el Measurement ID (`G-XXXXXXXXXX`) y cargarlo en
   `src/config/brand.ts` → `analytics.gaMeasurementId`.
2. Entrar al reporte estándar de GA4 ("Informes" > "Adquisición de
   tráfico" y "Interacción") para sacar los números del mes.
3. Los leads del formulario de contacto y del chatbot se ven directo en
   WhatsApp (no requieren nada adicional).

## Plantilla de reporte (completar y enviar)

```
Reporte de [Nombre del cliente] — [Mes/Año]

📊 Tráfico del sitio
- Visitas totales: ___
- De qué vinieron (orgánico / redes / Ads directo): ___

📩 Consultas generadas
- Por formulario de contacto: ___
- Por chatbot (si tiene el plan con mensualidad): ___
- Propiedad(es) con más interés este mes: ___

📝 Contenido
- Posts de blog publicados este mes: ___

✅ Mantenimiento realizado
- Actualizaciones de seguridad aplicadas: sí/no
- Otras mejoras del template propagadas: ___
```

## Por qué importa

El cliente no ve el trabajo de mantenimiento (hosting, seguridad,
dependencias actualizadas) a menos que se lo muestres explícitamente.
Este reporte es la forma de hacer visible ese trabajo y sostener la
renovación mes a mes, no solo durante la venta inicial.
