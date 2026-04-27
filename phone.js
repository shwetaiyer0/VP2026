if (no_error && elem.name == 'phone') {
                  if (!value.match(/^(?!.*(\d)\1{6})(\d{10})$/)) {
                    elem.className = elem.className + ' _has_error';
                    no_error = false;
                    tooltip = create_tooltip(elem, "Enter a valid phone number.");
                  }
                }