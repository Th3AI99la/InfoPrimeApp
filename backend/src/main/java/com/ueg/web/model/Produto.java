package com.ueg.web.model;

import java.math.BigDecimal; // Para o preço
import java.time.LocalDateTime; // Para datas modernas

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name="produto") // Confirme se o nome da tabela no seu BD é "produto"
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="nome", nullable = false, length = 255) // Adicionar restrições se desejar
    private String nome;

    @Column(name="quantidade") // No frontend, referimos como quantidadeEstoque ou qtde
    private int quantidade;

    // --- NOVOS CAMPOS ---
    @Column(name="descricao", columnDefinition = "TEXT") // Para textos mais longos
    private String descricao;

    @Column(name="preco", precision = 10, scale = 2) // Ex: 12345678.90
    private BigDecimal preco;

    @Column(name="imagem_url", length = 2048) // URL da imagem pode ser longa
    private String imagemUrl; // No frontend usamos imagemUrl

    @Column(name="disponivel_online")
    private boolean disponivelOnline; // No frontend usamos disponivelOnline

    @CreationTimestamp // Define a data/hora no momento da criação
    @Column(name="data_cadastro", nullable = false, updatable = false)
    private LocalDateTime dataCadastro;

    @UpdateTimestamp // Define a data/hora no momento da atualização
    @Column(name="data_atualizacao", nullable = false)
    private LocalDateTime dataAtualizacao;

    // --- CONSTRUTORES ---
    public Produto() {
        super();
    }

    // Construtor com campos antigos (pode ser útil manter ou remover/atualizar)
    public Produto(Long id, String nome, int quantidade) {
        super();
        this.id = id;
        this.nome = nome;
        this.quantidade = quantidade;
    }

    // Construtor com todos os campos (exemplo, pode ser gerado pela IDE)
    public Produto(String nome, int quantidade, String descricao, BigDecimal preco, String imagemUrl, boolean disponivelOnline) {
        this.nome = nome;
        this.quantidade = quantidade;
        this.descricao = descricao;
        this.preco = preco;
        this.imagemUrl = imagemUrl;
        this.disponivelOnline = disponivelOnline;
    }


    // --- GETTERS E SETTERS ---
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getNome() {
        return nome;
    }
    public void setNome(String nome) {
        this.nome = nome;
    }
    public int getQuantidade() {
        return quantidade;
    }
    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }

    // Getters e Setters para os NOVOS CAMPOS
    public String getDescricao() {
        return descricao;
    }
    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
    public BigDecimal getPreco() {
        return preco;
    }
    public void setPreco(BigDecimal preco) {
        this.preco = preco;
    }
    public String getImagemUrl() {
        return imagemUrl;
    }
    public void setImagemUrl(String imagemUrl) {
        this.imagemUrl = imagemUrl;
    }
    public boolean isDisponivelOnline() { // Getter para boolean geralmente é "is"
        return disponivelOnline;
    }
    public void setDisponivelOnline(boolean disponivelOnline) {
        this.disponivelOnline = disponivelOnline;
    }
    public LocalDateTime getDataCadastro() {
        return dataCadastro;
    }
    public void setDataCadastro(LocalDateTime dataCadastro) {
        this.dataCadastro = dataCadastro;
    }
    public LocalDateTime getDataAtualizacao() {
        return dataAtualizacao;
    }
    public void setDataAtualizacao(LocalDateTime dataAtualizacao) {
        this.dataAtualizacao = dataAtualizacao;
    }
}