@php($denied = request()->cookie('velvet_age') === 'denied')
<main class="age-gate" aria-labelledby="age-title">
    <section class="age-gate-panel">
        <div class="age-gate-logo"><img src="/assets/LOGO.svg?v=2" width="1920" height="1080" alt="The Velvet Studio"></div>
        <p class="age-gate-eyebrow">ACCESO EXCLUSIVO PARA ADULTOS</p>
        <h1 id="age-title">{{ $denied ? 'Acceso no permitido' : '¿Tienes 18 años o más?' }}</h1>
        @if ($denied)
            <p class="age-gate-description">Esta plataforma está dirigida exclusivamente a personas mayores de 18 años. No puedes continuar.</p>
            <a class="age-gate-accept" href="https://www.google.com/" rel="noreferrer">Salir del sitio <span aria-hidden="true">↗</span></a>
        @else
            <p class="age-gate-description">The Velvet Studio es una plataforma de streaming para adultos. Confirma que tienes al menos 18 años para continuar.</p>
            <form action="{{ route('age.confirm') }}" method="POST" class="age-gate-actions">
                @csrf
                <input type="hidden" name="return_to" value="{{ '/'.trim(request()->path(), '/') }}">
                <button class="age-gate-accept" type="submit" name="decision" value="confirm">Sí, tengo 18 años o más <span aria-hidden="true">→</span></button>
                <button class="age-gate-decline" type="submit" name="decision" value="deny">No, soy menor de 18 años</button>
            </form>
            <p class="age-gate-note">Recordaremos tu confirmación durante 30 días en este navegador mediante una cookie.</p>
        @endif
    </section>
</main>
