package com.pojo;

/**
 * Pojo used to handle PATCH of apimc / ressc
 * @author etp6110
 *
 */
public class GenComposantToSave {

	private Long id;
	private String auteur;
	private String statut;
	private String commentaire;
	private String responsableValidation;
	
	
	protected GenComposantToSave(){};
	
	public GenComposantToSave(Long id, String auteur, String statut, String commentaire,
			String responsableValidation) {
		this.id = id;
		this.auteur = auteur;
		this.statut = statut;
		this.commentaire = commentaire;
		this.responsableValidation = responsableValidation;
	}
	
		
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getAuteur() {
		return auteur;
	}
	public void setAuteur(String auteur) {
		this.auteur = auteur;
	}
	public String getStatut() {
		return statut;
	}
	public void setStatut(String statut) {
		this.statut = statut;
	}
	public String getCommentaire() {
		return commentaire;
	}
	public void setCommentaire(String commentaire) {
		this.commentaire = commentaire;
	}

	public String getResponsableValidation() {
		return responsableValidation;
	}

	public void setResponsableValidation(String responsableValidation) {
		this.responsableValidation = responsableValidation;
	}
}
