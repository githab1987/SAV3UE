(() => {
  const originalError = console.error.bind(console);

  function report(label, error) {
    const message = error?.message || String(error || "Unknown error");
    const detail = error?.status ? `\nStatus: ${error.status}` : "";
    originalError(`[SAV3UE DEBUG] ${label}:`, error);
    alert(`SAV3UE DEBUG\n\n${label}\n${message}${detail}`);
  }

  window.addEventListener("error", event => {
    report("JAVASCRIPT ERROR", event.error || event.message);
  });

  window.addEventListener("unhandledrejection", event => {
    report("PROMISE ERROR", event.reason);
  });

  window.SAV3UE_DEBUG = {
    async auth() {
      try {
        if (!window.supabaseClient)
          return report("AUTH", "supabaseClient tidak tersedia");

        const { data, error } =
          await window.supabaseClient.auth.getSession();

        if (error) return report("AUTH", error);

        alert(
          data?.session
            ? `SAV3UE DEBUG\n\nAUTH OK\nUser: ${data.session.user.id}`
            : "SAV3UE DEBUG\n\nAUTH: Tidak ada session"
        );
      } catch (error) {
        report("AUTH EXCEPTION", error);
      }
    }
  };
})();
