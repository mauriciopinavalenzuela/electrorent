import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  rut: string;

  @Column()
  nombre: string;

  @Column()
  correo: string;

  @Column()
  direccion: string;
}
