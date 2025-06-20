document.addEventListener("DOMContentLoaded", function() {

    // --- INICIALIZAÇÃO DAS BIBLIOTECAS ---
    AOS.init({ duration: 800, once: true, offset: 50 });
    GLightbox({ selector: '.glightbox', touchNavigation: true, loop: true });
    new Typed('#typed-services', {
        strings: ['Troca de Telas.', 'Troca de Baterias.', 'Remoção de Vírus.', 'Reparos de Software.', 'e muito mais!'],
        typeSpeed: 70, backSpeed: 40, loop: true, showCursor: true, cursorChar: '|',
    });

    // --- LÓGICA DO SITE ---

    // Funcionalidade do Menu Responsivo Aprimorado
    const menuToggle = document.querySelector(".menu-toggle");
    const mainNav = document.querySelector(".main-nav");

    menuToggle.addEventListener("click", function() {
        menuToggle.classList.toggle("active");
        mainNav.classList.toggle("active");
    });

    mainNav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", function() {
            if (mainNav.classList.contains("active")) {
                menuToggle.classList.remove("active");
                mainNav.classList.remove("active");
            }
        });
    });

    // Lógica do Formulário de Orçamento
    const servicoSelect = document.getElementById("servico");
    const descricaoProblemaDiv = document.getElementById("descricaoProblema");
    const outrosCamposDiv = document.getElementById("outrosCampos");
    const formOrcamento = document.getElementById("formOrcamento");
    const problemaOutroTextarea = document.getElementById("problemaOutro");
    const marcaInput = document.getElementById("marca");
    const modeloInput = document.getElementById("modelo");

    function toggleOrcamentoFields() {
        const servicoValue = servicoSelect.value;
        descricaoProblemaDiv.style.display = servicoValue === "Outro" ? "block" : "none";
        outrosCamposDiv.style.display = servicoValue !== "" && servicoValue !== "Outro" ? "block" : "none";
        problemaOutroTextarea.required = servicoValue === "Outro";
        marcaInput.required = servicoValue !== "" && servicoValue !== "Outro";
        modeloInput.required = servicoValue !== "" && servicoValue !== "Outro";
    }

    toggleOrcamentoFields();
    servicoSelect.addEventListener("change", toggleOrcamentoFields);

    formOrcamento.addEventListener("submit", function(e) {
        e.preventDefault();
        const servico = servicoSelect.value;
        let mensagem = "Olá, TopTech! Gostaria de solicitar um orçamento para: ";

        if (servico === "Outro") {
            mensagem += `o seguinte problema: ${problemaOutroTextarea.value.trim()}.`;
        } else {
            mensagem += `${servico} no aparelho ${marcaInput.value.trim()} ${modeloInput.value.trim()}.`;
        }
        
        mensagem += "\nAguardo o contato. Obrigado!";
        const numeroWhatsApp = "5598985336331"; // <-- VERIFIQUE SE ESTE NÚMERO ESTÁ CORRETO!
        const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
        
        window.open(linkWhatsApp, "_blank");
        formOrcamento.reset();
        toggleOrcamentoFields();
    });
});
