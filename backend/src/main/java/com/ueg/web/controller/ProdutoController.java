package com.ueg.web.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ueg.web.exception.ResourceNotFoundException;
import com.ueg.web.model.Produto;
import com.ueg.web.repository.ProdutoRepository;


@RequestMapping("/api")
@CrossOrigin(origins = "*") 

@RestController
public class ProdutoController {

    @Autowired
    private ProdutoRepository pRep;

    //Listar todos os produtos
    @GetMapping("/produtos") // Caminho completo será /api/produtos
    public List<Produto> listar(){
        return this.pRep.findAll();
    }

    //Consultar produto
    @GetMapping("/produtos/{id}") // Caminho completo será /api/produtos/{id}
    public ResponseEntity<Produto> consultar(@PathVariable Long id){
        Produto produto = pRep.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produto nao encontrado: " + id));
        return ResponseEntity.ok(produto);
    }

    //Inserir produto
    @PostMapping("/produtos") // Caminho completo será /api/produtos
    public Produto inserir(@RequestBody Produto produto) {
        return pRep.save(produto);
    }

    //Excluir produto
    @DeleteMapping("/produtos/{id}") // Caminho completo será /api/produtos/{id}
    public ResponseEntity<Map<String, Boolean>> excluir(@PathVariable Long id){
        // ... lógica de exclusão ...
        Produto produto = pRep.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produto nao encontrado: " + id));
        pRep.delete(produto);
        Map<String, Boolean> resposta = new HashMap<>();
        resposta.put("produtoExcluido", Boolean.TRUE);
        return ResponseEntity.ok(resposta);
    }

    //Alterar produto
    @PutMapping("/produtos/{id}") // Caminho completo será /api/produtos/{id}
    public ResponseEntity<Produto> alterar(@PathVariable Long id, @RequestBody Produto produtoDetalhes){
        // ... lógica de alteração como definida anteriormente ...
        Produto prodExistente = pRep.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produto nao encontrado: " + id));

        prodExistente.setNome(produtoDetalhes.getNome());
        prodExistente.setQuantidade(produtoDetalhes.getQuantidade());
        prodExistente.setDescricao(produtoDetalhes.getDescricao());
        prodExistente.setPreco(produtoDetalhes.getPreco());
        prodExistente.setImagemUrl(produtoDetalhes.getImagemUrl());
        prodExistente.setDisponivelOnline(produtoDetalhes.isDisponivelOnline());

        Produto produtoAtualizado = pRep.save(prodExistente);
        return ResponseEntity.ok(produtoAtualizado);
    }
}