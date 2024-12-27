PGDMP                      |            db    16.3    16.3     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    66456    db    DATABASE     }   CREATE DATABASE db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE db;
                postgres    false            �            1259    66457    c_role    TABLE     ^  CREATE TABLE public.c_role (
    id character varying(36) NOT NULL,
    kode character varying(50),
    nama character varying(50),
    created_at timestamp without time zone DEFAULT now(),
    created_by character varying(36),
    updated_at timestamp without time zone,
    updated_by character varying(36),
    is_deleted boolean DEFAULT false
);
    DROP TABLE public.c_role;
       public         heap    postgres    false            �            1259    66462    c_user    TABLE     �  CREATE TABLE public.c_user (
    id character varying(36) NOT NULL,
    nama character varying(50),
    username character varying(50),
    password character varying(250),
    id_role character varying(36),
    aktif boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT now(),
    created_by character varying(36),
    updated_at timestamp without time zone,
    updated_by character varying(36),
    is_deleted boolean DEFAULT false
);
    DROP TABLE public.c_user;
       public         heap    postgres    false            �            1259    66470 
   m_customer    TABLE     �  CREATE TABLE public.m_customer (
    id character varying(36) NOT NULL,
    kode character varying(50),
    nama character varying(250),
    no_telp character varying(250),
    alamat text,
    email character varying(50),
    npwp character varying(50),
    created_at timestamp without time zone DEFAULT now(),
    created_by character varying(36),
    updated_at timestamp without time zone,
    updated_by character varying(36),
    is_deleted boolean DEFAULT false
);
    DROP TABLE public.m_customer;
       public         heap    postgres    false            �            1259    66477 	   m_employe    TABLE     b  CREATE TABLE public.m_employe (
    id character varying(36) NOT NULL,
    kode character varying(50),
    nama character varying(250),
    created_at timestamp without time zone DEFAULT now(),
    created_by character varying(36),
    updated_at timestamp without time zone,
    updated_by character varying(36),
    is_deleted boolean DEFAULT false
);
    DROP TABLE public.m_employe;
       public         heap    postgres    false            �            1259    66482    menu    TABLE     �  CREATE TABLE public.menu (
    id character varying DEFAULT 'uuid_g'::character varying NOT NULL,
    nama_menu character varying,
    link_menu character varying,
    keterangan character varying,
    class_icon character varying,
    status character varying,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp with time zone,
    is_permission boolean,
    is_deleted boolean DEFAULT false
);
    DROP TABLE public.menu;
       public         heap    postgres    false            �            1259    66490 	   menu_user    TABLE     �  CREATE TABLE public.menu_user (
    id character varying NOT NULL,
    id_menu character varying NOT NULL,
    posisi character varying(1),
    level integer,
    urutan integer,
    status character varying(1),
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone,
    parent character varying,
    id_role character varying,
    is_deleted boolean DEFAULT false
);
    DROP TABLE public.menu_user;
       public         heap    postgres    false            �          0    66457    c_role 
   TABLE DATA           l   COPY public.c_role (id, kode, nama, created_at, created_by, updated_at, updated_by, is_deleted) FROM stdin;
    public          postgres    false    215   ^       �          0    66462    c_user 
   TABLE DATA           �   COPY public.c_user (id, nama, username, password, id_role, aktif, created_at, created_by, updated_at, updated_by, is_deleted) FROM stdin;
    public          postgres    false    216   �       �          0    66470 
   m_customer 
   TABLE DATA           �   COPY public.m_customer (id, kode, nama, no_telp, alamat, email, npwp, created_at, created_by, updated_at, updated_by, is_deleted) FROM stdin;
    public          postgres    false    217   �!       �          0    66477 	   m_employe 
   TABLE DATA           o   COPY public.m_employe (id, kode, nama, created_at, created_by, updated_at, updated_by, is_deleted) FROM stdin;
    public          postgres    false    218   �#       �          0    66482    menu 
   TABLE DATA           �   COPY public.menu (id, nama_menu, link_menu, keterangan, class_icon, status, created_at, updated_at, is_permission, is_deleted) FROM stdin;
    public          postgres    false    219   B$       �          0    66490 	   menu_user 
   TABLE DATA           �   COPY public.menu_user (id, id_menu, posisi, level, urutan, status, created_at, updated_at, parent, id_role, is_deleted) FROM stdin;
    public          postgres    false    220   �&       <           2606    66498    c_role c_role_pk 
   CONSTRAINT     N   ALTER TABLE ONLY public.c_role
    ADD CONSTRAINT c_role_pk PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.c_role DROP CONSTRAINT c_role_pk;
       public            postgres    false    215            >           2606    66500    c_user c_user_pk 
   CONSTRAINT     N   ALTER TABLE ONLY public.c_user
    ADD CONSTRAINT c_user_pk PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.c_user DROP CONSTRAINT c_user_pk;
       public            postgres    false    216            @           2606    66502    m_customer m_customer_pk 
   CONSTRAINT     V   ALTER TABLE ONLY public.m_customer
    ADD CONSTRAINT m_customer_pk PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.m_customer DROP CONSTRAINT m_customer_pk;
       public            postgres    false    217            B           2606    66504    m_employe m_employe_pk 
   CONSTRAINT     T   ALTER TABLE ONLY public.m_employe
    ADD CONSTRAINT m_employe_pk PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.m_employe DROP CONSTRAINT m_employe_pk;
       public            postgres    false    218            D           2606    66506    menu menu_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.menu
    ADD CONSTRAINT menu_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.menu DROP CONSTRAINT menu_pkey;
       public            postgres    false    219            F           2606    66508    menu_user menu_user_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.menu_user
    ADD CONSTRAINT menu_user_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.menu_user DROP CONSTRAINT menu_user_pkey;
       public            postgres    false    220            G           2606    66509    c_user c_user_id_role_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.c_user
    ADD CONSTRAINT c_user_id_role_fkey FOREIGN KEY (id_role) REFERENCES public.c_role(id) ON UPDATE CASCADE;
 D   ALTER TABLE ONLY public.c_user DROP CONSTRAINT c_user_id_role_fkey;
       public          postgres    false    215    216    4668            �   �   x�M�1� �N��y��Lk��F��"�?B�ġ�7��)	���8'g�Fบ��c`Q����>=g�!a�o��&�eg=�>_�v5��P���Ș���tpF�	��_u���k�+b4�Q����r�����6*{      �   �  x���Mo�@���Wp�ffg?}%��+*Q���"�@�0����QҊk5sx��f�g^��CΌ#`BE`��`1Jm��5�L��]88�����ǋB�T�ϳ}��f�<_�f��1��E8,���4οN���A)�~6��|��(Zf���]����D|�$�`��.��lj�Q���c�0�a����d`ζ� �D�x��ZCS]��m?�_�K=�-֫�tTn�:?���a�Թ�_)���?�o�N��P���k��V��B��l_hK`</H	M���.B&m�2%�����Ted3�)���?����4*f�<��^���,D(K�@� l�e{mNӅ�Lf��_��ĸ���*ԛީ۶��0��n�]6Us���eњ]��&5��>������o&��      �   &  x�m��j�@�����.�3��+�4��M0q�7�iW��X2�D��w;��]�e��|猏��Tޠk8@RC<Ȝj뤮}*�R��~��1�U�����MG�F��F0`�/n^��wd?s�}Ǝ��~ɔK���t��eKvۿ�c��yI��`��[zbE]Td?�|lwKv�o���40��Q�}�:VݧQ��M5X�r ��B���RW�kÔ-�.�^:/�x����J�J a��j���F!5񦒊������j@5��Um�&C6������K������4��.MǑ�c�Ƀ�4`EV�6���?3Xү�p�dh{b0Jj� :��a�w���q�hR���8�PEǫ�2�XŜBe"!���_�m��}�A��$$�{J8Ŷ�d�����ѶM=/}�_)w��F��<bu���X�
����PJk�.��,��>�9}������25�C�=�b0��̼�j�OV�{ꞭS�6C��\RE��D�Z3�H�Ҽj?�|�b�9�1���2_+�r�\�B[���G�>A=��b�.�      �   T   x�-��� �3���$�!�"���+��/�l�ic/�Z���e$v�^��+� ��>���*lu��rL�l����G"� ��}      �   S  x�m��n�0�g�S�X�GJ�(i+ڥC�ٲH��һ�v�ǯl$�K�Ő)B���V� e��%Eb�8��%eL���<N�c���1�S����]9���i���-I�P�H"JP@�*�!tt����{G̎?��o��l��L$i�֒J��;ϒR<P)�Q܏�s9=�i���~��	H����Zue1�`l �3Y�zcq��`e��4�J2�$t.aR5�nUE|�-�;��q�)�����n��,�hJ>ˡr��SmqV"CV�o��u�4\7�?=�e�ִ��;"�h�(�n�@� �k�q� " �轤!�)6I�%FP�p�b!�R�����.Bih���p��;lBSP�s�Z;�"�v�k�V��i�m�� �ء!0H��'C��*�\A|��t��,�y;ވr�_���P~�k�U#�;�|�m��H���0 ����n"�&�&�v����̛f$R�O%%����2M����My.P��Q������ζؠ�'e�0�!�^!��ڈ������f�44g$x�6�>W�u*G����r^��l�W�t�s3B���VQ0��֩Vop�j2����<����/Q!�      �   �  x���ݍ\1���T���T�/���¬��h#M��-˲����s3��14�O�X���������;�����f�E�c�B�L7�-�)�������c���b[1#������}�#B-�i��c�@3�gN�&s��5���V<���v�r�t��"��٘�������o�kȒo����%�G\6����@N6�R-��������$O�����J�M�!�(��T��zpN	Ҡ�B)����dƆ�=+���R���4��';�����l���fk:����2_�alb���8y�k3vĳ��N C*U�����qXu��N���&�՟���_�o��Mv׵���%�P�n9�4k;�r\���Q%���2V�2V-� Nܕ�WnF�9n�'2���gV�a\j�f�z1x,�_�y6�H������ެ����x�E�     