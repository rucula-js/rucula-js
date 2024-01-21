import assert from 'assert';
import {JSDOM} from 'jsdom'

import {RepresentationField} from "../entities/form/representationField"
import { createTableDependency } from './TableDependency';
import { frame } from '../entities/form/frame';

describe("Typescript usage suite", () => {
    
    let frames = [{
        name: "Cliente",
        objectDto: "cliente",
        fields: [
          {
            propertDto: "nome",
            description: "Nome",
            maxLength: 80
          },
          {
            propertDto: "telefone",
            description: "Telefone",
            maxLength: 12
          },
          {
            propertDto: "email",
            description: "Email",
            maxLength: 150
          }
        ]
}] as frame []

    const { document } = new JSDOM(`<!DOCTYPE html><html lang="pt-br"><head></head><body></html>`).window;
    
    it("should be able to execute a test", () => {
        assert.equal(1,1)
    });
});