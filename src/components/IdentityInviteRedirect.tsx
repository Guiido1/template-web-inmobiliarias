"use client";

import Script from "next/script";

// Solo se usa en la home. Los links de invitación/recuperación de
// contraseña de Netlify Identity apuntan a la raíz del sitio con un
// token en el hash de la URL — este script detecta eso y abre el modal
// correspondiente. No se carga en el resto del sitio para no sumarle
// peso a páginas que ningún visitante común necesita.
export function IdentityInviteRedirect() {
  return (
    <Script
      src="https://identity.netlify.com/v1/netlify-identity-widget.js"
      strategy="afterInteractive"
      onLoad={() => {
        const widget = (
          window as unknown as {
            netlifyIdentity?: {
              on: (event: string, cb: (user?: unknown) => void) => void;
              open: () => void;
            };
          }
        ).netlifyIdentity;

        widget?.on("init", () => {
          if (
            window.location.hash &&
            /invite_token|recovery_token|confirmation_token|email_change_token/.test(
              window.location.hash
            )
          ) {
            widget.open();
          }
        });
      }}
    />
  );
}
