package com.ocbc.backend.entities;

import lombok.Data;

@Data
public class MessageDetail {
	
	private String message;
	private Integer code;
	
	public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    public Integer getCode() {
        return code;
    }
    public void setCode(Integer code) {
        this.code = code;
    }

}