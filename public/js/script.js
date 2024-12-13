(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()

  function submitForm(listingId,reviewId) {
    event.preventDefault(); // Prevent default anchor behavior
    
    // Create a form dynamically
    const form = document.createElement('form');
    form.action = `/listings/${listingId}/reviews/${reviewId}?_method=DELETE`; // Set the action URL
    form.method = 'POST'; // Set the method (e.g., POST or GET)
    
    // Optional: Add hidden inputs for additional data
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'key';
    input.value = 'value';
    form.appendChild(input);
    
    // Append form to body and submit it
    document.body.appendChild(form);
    form.submit();
  }