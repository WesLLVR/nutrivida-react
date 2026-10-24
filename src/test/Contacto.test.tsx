// @vitest-environment jsdom
import '@testing-library/jest-dom/vitest';
import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import Contacto from '../paginas/Contacto';

vi.mock('../componentes/organismos/FormularioContacto', () => ({
  default: () => <div data-testid="mock-formulario">Formulario Mock</div>,
}));

describe('Pruebas en Contacto', () => {
  it('debe tener las clases responsivas col-12, col-md-8 y col-lg-6', () => {
    const { container } = render(<Contacto />);

    const columna = container.querySelector('.col-12');

    expect(columna).not.toBeNull();
    expect(columna).toHaveClass('col-12');
    expect(columna).toHaveClass('col-md-8');
    expect(columna).toHaveClass('col-lg-6');
  });

});
