document.addEventListener("DOMContentLoaded", function() {

    
    AOS.init({
        duration: 800,  
        once: true,     
        offset: 50,     
    });


    const lightbox = GLightbox({
        selector: '.glightbox',
        touchNavigation: true,
        loop: true,
    });


    new Typed('#typed-services', {
        strings: [
            'Troca de Telas.',
            'Troca de Baterias.',
            'Remoção de Vírus.',
            'Reparos de Software.',
            'e muito mais!'
        ],
        typeSpeed: 70,
        backSpeed: 40,
        loop: true,
        showCursor: true,
        cursorChar: '|',
    });


    const menuToggle = document.querySelector(".menu-toggle");
    const mainNav = document.querySelector(".main-nav");

    menuToggle.addEventListener("click", function() {
        mainNav.classList.toggle("active");
    });

    mainNav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", function() {
            if (window.innerWidth <= 768) {
                mainNav.classList.remove("active");
            }
        });
    });



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
            const problema = problemaOutroTextarea.value.trim();
            if (!problema) {
                alert("Por favor, descreva o problema.");
                return;
            }
            mensagem += `o seguinte problema: ${problema}.`;
        } else {
            const marca = marcaInput.value.trim();
            const modelo = modeloInput.value.trim();
            if (!marca || !modelo) {
                alert("Por favor, preencha a marca e o modelo do aparelho.");
                return;
            }
            mensagem += `${servico} no aparelho ${marca} ${modelo}.`;
        }
        
        mensagem += "\nAguardo o contato. Obrigado!";

        const numeroWhatsApp = "5598985336331";
        const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
        
        window.open(linkWhatsApp, "_blank");

        formOrcamento.reset();
        toggleOrcamentoFields();
    });
});